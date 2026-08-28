import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import CarCard from './Components/CarCard/CarCard';
import CarDetails from './Components/CarCard/CarDetails/CarDetails';

// Fallback static data if API call is skipped or loading
const INITIAL_CARS = [
  {
    id: 1,
    name: 'Toyota Camry',
    year: 2024,
    price: 28000,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb'
  },
  {
    id: 2,
    name: 'Honda Civic',
    year: 2024,
    price: 26000,
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588'
  },
  {
    id: 3,
    name: 'BMW 3 Series',
    year: 2024,
    price: 45000,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e'
  }
];

export default function App() {
 const [cars] = useState(INITIAL_CARS);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Example API Integration hook template
  /*
  useEffect(() => {
    fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json')
      .then((res) => res.json())
      .then((data) => {
        // Format API response to match car state structure
      })
      .catch((err) => console.error(err));
  }, []);
  */

  const filteredCars = cars
    .filter((car) =>
      car.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'newest') return b.year - a.year;
      if (sortBy === 'oldest') return a.year - b.year;
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });

  return (
   <Router basename='/Car-Project'>
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
            {/* Home Route */}
            <Route
              path="/"
              element={
                <>
                  <section className="hero" id="home">
                    <h2>Find Your Perfect Car</h2>
                    <p>Search and explore cars from around the world.</p>

                    <form className="search-box" onSubmit={(e) => e.preventDefault()}>
                      <input
                        type="text"
                        placeholder="Search for a car..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
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
                        onChange={(event) => setSortBy(event.target.value)}
                        aria-label="Sort cars by year or price"
                      >
                        <option value="">Sort Cars</option>
                        <option value="newest">Year: Newest First</option>
                        <option value="oldest">Year: Oldest First</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                      </select>
                    </div>

                    <div className="car-list">
                      {filteredCars.length > 0 ? (
                        filteredCars.map((car) => (
                          <CarCard key={car.id} car={car} />
                        ))
                      ) : (
                        <p className="no-results">No cars found.</p>
                      )}
                    </div>
                  </section>

                  <section className="about" id="about">
                    <h2>About CarHub</h2>
                    <p>Your premier destination to explore modern vehicles and specifications.</p>
                  </section>
                </>
              }
            />

            {/* Car Details Route */}
            <Route path="/car/:id" element={<CarDetails cars={cars} />} />
          </Routes>
        </main>

        <footer>
          <p>© 2026 CarHub. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}