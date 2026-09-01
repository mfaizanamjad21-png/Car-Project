import { Link } from "react-router-dom";
import "./CarCard.css";

export default function CarCard({ car }) {
  const handleImageError = (e) => {
    e.currentTarget.src =
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80";
  };

  return (
    <Link to={`/car/${car.id}`} className="car-card fade-in">
      <div className="car-image-wrapper">
        <img
          src={car.image}
          alt={car.name}
          className="car-image"
          loading="lazy"
          decoding="async"
          onError={handleImageError}
        />
      </div>

      <div className="car-info">
        <h3>{car.name}</h3>

        <p>Year: {car.year}</p>

        <p>
          Price: ${Number(car.price).toLocaleString()}
        </p>

        <button
          className="details-btn"
          onClick={(e) => e.stopPropagation()}
        >
          View Details
        </button>
      </div>
    </Link>
  );
}