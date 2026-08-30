import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './CarDetails.css';

export default function CarDetails({ cars }) {
  const { id } = useParams();

  const car = cars?.find(
    (item) => String(item.id) === String(id)
  );

  if (!car) {
    return (
      <div className="details-container">
        <h2>Car Not Found</h2>

        <Link to="/" className="back-btn">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="details-container">
      <Link to="/" className="back-btn">
        &larr; Back to Cars
      </Link>

      <div className="details-content">
        <img
          src={car.image}
          alt={car.name}
          className="details-image"
        />

        <div className="details-info">
          <h2>{car.name}</h2>

          <p>
            <strong>Make:</strong> {car.make}
          </p>

          <p>
            <strong>Model:</strong> {car.model}
          </p>

          <p>
            <strong>Year:</strong> {car.year}
          </p>

          <p>
            <strong>Price:</strong>{' '}
            {car.price !== null
              ? `$${car.price.toLocaleString()}`
              : 'Not available'}
          </p>

          <p>
            <strong>Description:</strong> Vehicle information
            provided by the NHTSA vPIC public API.
          </p>
        </div>
      </div>
    </div>
  );
}