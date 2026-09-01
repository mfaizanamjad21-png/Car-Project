import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import "./App.css";

import CarCard from "./Components/CarCard/CarCard";
import CarDetails from "./Components/CarCard/CarDetails/CarDetails";
import Navbar from "./Components/Navbar/Navbar";

import Explore from "./Pages/Explore";
import Garage from "./Pages/Garage";
import CompareCars from "./Pages/CompareCars";
import Reviews from "./Pages/Reviews";
import FuelCalculator from "./Pages/FuelCalculator";

function App() {
  // ==========================================
  // STATE
  // ==========================================

  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [favorites, setFavorites] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // ==========================================
  // FEATURED CARS
  // ==========================================

  const staticCars = [
    {
      id: "toyota-camry",
      name: "Toyota Camry",
      make: "Toyota",
      model: "Camry",
      year: 2024,
      price: 28000,
      image:
        "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=900&q=80",
    },

    {
      id: "honda-civic",
      name: "Honda Civic",
      make: "Honda",
      model: "Civic",
      year: 2024,
      price: 26000,
      image:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80",
    },

    {
      id: "bmw-3-series",
      name: "BMW 3 Series",
      make: "BMW",
      model: "3 Series",
      year: 2024,
      price: 45000,
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80",
    },
  ];

  // ==========================================
  // PRICE RANGES
  // ==========================================

  const priceMap = {
    toyota: [25000, 45000],
    honda: [24000, 35000],
    ford: [28000, 55000],
    bmw: [45000, 80000],
    mercedes: [50000, 90000],
    audi: [42000, 85000],
    nissan: [22000, 40000],
    chevrolet: [23000, 50000],
    lexus: [40000, 75000],
    hyundai: [22000, 40000],
    kia: [22000, 42000],
    mazda: [24000, 40000],
    subaru: [25000, 42000],
    volkswagen: [25000, 50000],
  };

  // ==========================================
  // GET CAR IMAGE
  // ==========================================

  const getCarImage = (make, model, year = 2024) => {
    const cleanMake = encodeURIComponent(
      String(make || "").trim()
    );

    const cleanModel = encodeURIComponent(
      String(model || "").trim()
    );

    return `https://carapi.trustcar.info/getImage?make=${cleanMake}&model=${cleanModel}&year=${year}`;
  };

  // ==========================================
  // SEARCH FUNCTION
  // ==========================================

  const handleSearch = async () => {
    const searchValue = search.trim();

    // Don't search if empty
    if (!searchValue) {
      setError("Please enter a car make.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // ----------------------------------------
      // GET MAKE
      // ----------------------------------------

      const make = searchValue
        .split(" ")[0]
        .toLowerCase();

      // ----------------------------------------
      // NHTSA API
      // ----------------------------------------

      const apiUrl =
        `https://vpic.nhtsa.dot.gov/api/vehicles/` +
        `getmodelsformake/${encodeURIComponent(make)}` +
        `?format=json`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();

      // ----------------------------------------
      // CHECK RESULTS
      // ----------------------------------------

      if (
        !data.Results ||
        data.Results.length === 0
      ) {
        setCars([]);
        setError(
          `No cars found for "${searchValue}".`
        );
        return;
      }

      // ----------------------------------------
      // PRICE RANGE
      // ----------------------------------------

      const [minPrice, maxPrice] =
        priceMap[make] || [20000, 60000];

      // ----------------------------------------
      // CREATE CAR DATA
      // ----------------------------------------

      const apiCars = data.Results
        .slice(0, 8)
        .map((model, index) => {
          const makeName =
            model.Make_Name || searchValue;

          const modelName =
            model.Model_Name || "Unknown Model";

          const year = 2024;

          const randomPrice = Math.floor(
            Math.random() *
              (maxPrice - minPrice + 1) +
              minPrice
          );

          return {
            id: `${model.Make_ID}-${model.Model_ID}-${index}`,

            name: `${makeName} ${modelName}`,

            make: makeName,

            model: modelName,

            year: year,

            price: randomPrice,

            image: getCarImage(
              makeName,
              modelName,
              year
            ),
          };
        });

      // ----------------------------------------
      // DISPLAY RESULTS
      // ----------------------------------------

      setCars(apiCars);
      setSortBy("");
    } catch (err) {
      console.error(err);

      setCars([]);

      setError(
        "Something went wrong while searching. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // GO BACK TO FEATURED CARS
  // ==========================================

  const handleBackToFeatured = () => {
    setCars([]);
    setSearch("");
    setError("");
    setSortBy("");
  };

  // ==========================================
  // SORT CARS
  // ==========================================

  const displayedCars =
    cars.length > 0 ? cars : staticCars;

  const sortedCars = [...displayedCars].sort(
    (a, b) => {
      if (sortBy === "newest") {
        return b.year - a.year;
      }

      if (sortBy === "oldest") {
        return a.year - b.year;
      }

      if (sortBy === "price-low") {
        return a.price - b.price;
      }

      if (sortBy === "price-high") {
        return b.price - a.price;
      }

      return 0;
    }
  );

  // ==========================================
  // FAVORITES
  // ==========================================

  const handleFavoriteToggle = (car) => {
    setFavorites((previous) => {
      const alreadyFavorite = previous.some(
        (item) => item.id === car.id
      );

      if (alreadyFavorite) {
        return previous.filter(
          (item) => item.id !== car.id
        );
      }

      return [...previous, car];
    });
  };

  // ==========================================
  // RECENTLY VIEWED
  // ==========================================

  const handleViewed = (car) => {
    setRecentlyViewed((previous) => {
      const filtered = previous.filter(
        (item) => item.id !== car.id
      );

      return [car, ...filtered].slice(0, 6);
    });
  };

  // ==========================================
  // HOME PAGE
  // ==========================================

  const Home = () => {
    return (
      <>
        {/* ====================================
            HERO SECTION
        ==================================== */}

        <section className="hero hero-honda">
          <div className="hero-content">

            <h1>
              CarHub: Designed for Your Drive
            </h1>

            <p>
              Discover modern vehicles, compare
              trims, and build the garage that fits
              your life.
            </p>

            {/* SEARCH BAR */}

            <form
              className="search-box hero-search"
              onSubmit={(event) => {
                event.preventDefault();
                handleSearch();
              }}
            >
              <input
                type="text"
                placeholder="Search by make (Honda, Toyota, BMW)..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />

              <button
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Searching..."
                  : "Search Inventory"}
              </button>
            </form>

            {/* SEARCH EXAMPLES */}

            <div className="hero-tags">
              <span>EV & Hybrid</span>
              <span>Family SUVs</span>
              <span>Sport Sedans</span>
            </div>

          </div>
        </section>

        {/* ====================================
            CAR SECTION
        ==================================== */}

        <section className="cars">

          {/* ==================================
              HEADING + ACTIONS
          ================================== */}

          <div className="cars-heading">

            <div>
              <h2>
                {cars.length > 0
                  ? "Search Results"
                  : "Featured Cars"}
              </h2>

              <p>
                {cars.length > 0
                  ? `${cars.length} vehicles found`
                  : "Explore popular vehicles"}
              </p>
            </div>

            <div className="cars-actions">

              {/* BACK BUTTON */}

              {cars.length > 0 && (
                <button
                  className="back-btn"
                  onClick={handleBackToFeatured}
                  type="button"
                >
                  ← Back to Featured Cars
                </button>
              )}

              {/* SORT */}

              <select
                className="sort-select"
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value)
                }
              >
                <option value="">
                  Sort Cars
                </option>

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
          </div>

          {/* ==================================
              ERROR MESSAGE
          ================================== */}

          {error && (
            <div className="search-error">
              {error}
            </div>
          )}

          {/* ==================================
              LOADING
          ================================== */}

          {loading && (
            <div className="loading-message">
              Searching for vehicles...
            </div>
          )}

          {/* ==================================
              CAR CARDS
          ================================== */}

          {!loading && (
            <div className="car-list">

              {sortedCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  onFavoriteToggle={
                    handleFavoriteToggle
                  }
                  onViewed={handleViewed}
                  isFavorite={favorites.some(
                    (favorite) =>
                      favorite.id === car.id
                  )}
                />
              ))}

            </div>
          )}

        </section>

        {/* ====================================
            FAVORITES + RECENTLY VIEWED
        ==================================== */}

        <section className="about">

          <div className="garage-summary">

            {/* FAVORITES */}

            <div>
              <h3>Your Favorites</h3>

              {favorites.length === 0 ? (
                <p>
                  No favorite cars yet.
                </p>
              ) : (
                <ul>
                  {favorites.map((car) => (
                    <li key={car.id}>
                      {car.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* RECENTLY VIEWED */}

            <div>
              <h3>Recently Viewed</h3>

              {recentlyViewed.length === 0 ? (
                <p>
                  No recently viewed cars.
                </p>
              ) : (
                <ul>
                  {recentlyViewed.map((car) => (
                    <li key={car.id}>
                      {car.name}
                    </li>
                  ))}
                </ul>
              )}

            </div>

          </div>

        </section>
      </>
    );
  };

  // ==========================================
  // APP ROUTES
  // ==========================================

  return (
    <Router basename="/Car-Project">

      <div className="App">

        <Navbar />

        <main>

          <Routes>

            {/* HOME */}

            <Route
              path="/"
              element={<Home />}
            />

            {/* CAR DETAILS */}

            <Route
              path="/car/:id"
              element={
                <CarDetails
                  cars={sortedCars}
                  favorites={favorites}
                  onFavoriteToggle={
                    handleFavoriteToggle
                  }
                  onViewed={handleViewed}
                />
              }
            />

            {/* EXPLORE */}

            <Route
              path="/explore"
              element={<Explore />}
            />

            {/* GARAGE */}

            <Route
              path="/garage"
              element={
                <Garage
                  favorites={favorites}
                  recentlyViewed={
                    recentlyViewed
                  }
                />
              }
            />

            {/* COMPARE */}

            <Route
              path="/compare"
              element={
                <CompareCars
                  cars={sortedCars}
                  favorites={favorites}
                />
              }
            />

            {/* REVIEWS */}

            <Route
              path="/reviews"
              element={<Reviews />}
            />

            {/* FUEL CALCULATOR */}

            <Route
              path="/fuel"
              element={<FuelCalculator />}
            />

          </Routes>

        </main>

        {/* ====================================
            FOOTER
        ==================================== */}

        <footer>
          <p>
            © 2026 CarHub. All rights reserved.
          </p>
        </footer>

      </div>

    </Router>
  );
}

export default App;