import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import CarCard from './Components/CarCard/CarCard';
import CarDetails from './Components/CarCard/CarDetails/CarDetails';

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

        // Get vehicle makes directly from the public NHTSA API
        const makesResponse = await fetch(
          'https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json'
        );

        if (!makesResponse.ok) {
          throw new Error('Unable to load vehicle makes.');
        }

        const makesData = await makesResponse.json();

        // Use actual API results instead of hardcoded car makes
        const selectedMakes = makesData.Results
          .filter((make) => make.Make_Name)
          .slice(0, 8);

        const requests = selectedMakes.map(async (make) => {
          const response = await fetch(
            `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${encodeURIComponent(
              make.Make_Name
            )}/modelyear/2024?format=json`
          );

          if (!response.ok) {
            return [];
          }

          const data = await response.json();

          return data.Results.slice(0, 10).map((vehicle, index) => ({
            id: `${vehicle.Make_ID}-${vehicle.Model_ID}-${index}`,
            name: `${vehicle.Make_Name} ${vehicle.Model_Name}`,
            make: vehicle.Make_Name,
            model: vehicle.Model_Name,
            year: 2024,

            // NHTSA does not provide vehicle sale prices.
            price: null,

            // NHTSA does not provide vehicle photographs.
            image:
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

        if (allCars.length === 0) {
          throw new Error('No vehicles were returned by the API.');
        }

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
      if (sortBy === 'newest') {
        return b.year - a.year;
      }

      if (sortBy === 'oldest') {
        return a.year - b.year;
      }

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
                        aria-label="Sort cars by year"
                      >
                        <option value="">Sort Cars</option>

                        <option value="newest">
                          Year: Newest First
                        </option>

                        <option value="oldest">
                          Year: Oldest First
                        </option>
                      </select>
                    </div>

                    {loading && (
                      <p className="no-results">
                        Loading cars from API...
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