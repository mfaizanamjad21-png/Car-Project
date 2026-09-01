import { Link, useParams } from "react-router-dom";
import "./CarDetails.css";

export default function CarDetails({ cars }) {
  const { id } = useParams();
  const car = cars.find((c) => c.id === id);

  if (!car) {
    return (
      <div className="car-details fade-in">
        <p>Car not found.</p>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="car-details fade-in">
      <img src={car.image} alt={car.name} className="details-image" />

      <h2>{car.name}</h2>

      <div className="details-info">
        <p><strong>Make:</strong> {car.make}</p>
        <p><strong>Model:</strong> {car.model}</p>
        <p><strong>Year:</strong> {car.year}</p>
        <p><strong>Price:</strong> ${car.price.toLocaleString()}</p>
      </div>

      <Link to="/" className="back-link">← Back to Home</Link>
    </div>
  );
}
