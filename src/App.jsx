import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import CarCard from './Components/CarCard/CarCard';
import CarDetails from './Components/CarCard/CarDetails/CarDetails';

const MAKES = [
  'Toyota',
  'Honda',
  'Ford',
  'Chevrolet',
  'BMW',
  'Nissan',
  'Hyundai',
  'Kia'
];

const CAR_IMAGES = {
  Toyota:
    'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb',
  Honda:
    'https://images.unsplash.com/photo-1590362891991-f776e747a588',
  BMW:
    'https://images.unsplash.com/photo-1555215695-3004980ad54e',
  Ford:
    'https://images.unsplash.com/photo-1494905998402-395d579af36f',
  Chevrolet:
    'https://images.unsplash.com/photo-1553440569-bcc63803a83d',
  Nissan:
    'https://images.unsplash.com/photo-1542362567-b07e54358753',
  Hyundai:
    'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6',
  Kia:
    'https://images.unsplash.com/photo-1606016159991-dfe4f2746f3f'
};

export default function App() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError('');

        const requests = MAKES.map(async (make) => {
          const response = await fetch(
            `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${encodeURIComponent(
              make
            )}/modelyear/2024?format=json`
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch ${make}`);
          }

          const data = await response.json();

          return data.Results.map((vehicle, index) => ({
            id: `${make}-${vehicle.Model_ID}-${index}`,
            name: `${vehicle.Make_Name} ${vehicle.Model_Name}`,
            make: vehicle.Make_Name,
            model: vehicle.Model_Name,
            year: 2024,
            price: null,
            image:
              CAR_IMAGES[vehicle.Make_Name] ||
              'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7'
          }));
        });

        const results = await Promise.all(requests);

        const allCars = results
          .flat()
          .filter(
            (car, index, array) =>
              index ===
              array.findIndex(
                (item) =>
                  item.name.toLowerCase() === car.name.toLowerCase()
              )
          );

        setCars(allCars);
      } catch (err) {
        console.error('Car API Error:', err);
        setError('Unable to load cars from the API.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars
    .filter((car) =>
      car.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'newest') return b.year - a.year;
      if (sortBy === 'oldest') return a.year - b.year;

      // NHTSA does not provide vehicle prices,
      // so price sorting is intentionally not performed.
      if (sortBy === 'price-low') return 0;
      if (sortBy === 'price-high') return 0;

      return 0;
    });

  return (
    <Router basename="/Car-Project">
      <div className="App">
        <header className="navbar">
          <h1>CarHub</h1>

          <nav>
            <Link to="/">Home</Link>
            <a href="#cars">Cars</a>
            <a href="#about">About</a>
          </nav>
        </header>

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <section className="hero" id="home">
                    <h2>Find Your Perfect Car</h2>

                    <p>
                      Search and explore cars from around the world.
                    </p>

                    <form
                      className="search-box"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <input
                        type="text"
                        placeholder="Search for a car..."
                        value={search}
                        onChange={(event) =>
                          setSearch(event.target.value)
                        }
                      />

                      <button type="submit">Search</button>
                    </form>
                  </section>

                  <section className="cars" id="cars">
                    <div className="cars-heading">
                      <h2>Featured Cars</h2>

                      <select
                        className="sort-select"
                        value={sortBy}
                        onChange={(event) =>
                          setSortBy(event.target.value)
                        }
                        aria-label="Sort cars by year or price"
                      >
                        <option value="">Sort Cars</option>
                        <option value="newest">
                          Year: Newest First
                        </option>
                        <option value="oldest">
                          Year: Oldest First
                        </option>
                        <option value="price-low">
                          Price: Low to High
                        </option>
                        <option value="price-high">
                          Price: High to Low
                        </option>
                      </select>
                    </div>

                    {loading && (
                      <p className="no-results">
                        Loading cars...
                      </p>
                    )}

                    {error && (
                      <p className="no-results">
                        {error}
                      </p>
                    )}

                    {!loading && !error && (
                      <div className="car-list">
                        {filteredCars.length > 0 ? (
                          filteredCars.map((car) => (
                            <CarCard
                              key={car.id}
                              car={car}
                            />
                          ))
                        ) : (
                          <p className="no-results">
                            No cars found.
                          </p>
                        )}
                      </div>
                    )}
                  </section>

                  <section className="about" id="about">
                    <h2>About CarHub</h2>

                    <p>
                      Your premier destination to explore modern
                      vehicles and specifications.
                    </p>
                  </section>
                </>
              }
            />

            <Route
              path="/car/:id"
              element={<CarDetails cars={cars} />}
            />
          </Routes>
        </main>

        <footer>
          <p>© 2026 CarHub. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}