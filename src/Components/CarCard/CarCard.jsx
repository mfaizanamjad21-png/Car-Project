import React from 'react';
import { Link } from 'react-router-dom';
import './CarCard.css';

export default function CarCard({ car }) {
  return (
    <div className="car-card">
      <img
        src={car.image}
        alt={car.name}
        className="car-image"
      />

      <div className="car-info">
        <h3>{car.name}</h3>

        <p>Year: {car.year}</p>

        <p>
          Price:{' '}
          {car.price !== null
            ? `$${car.price.toLocaleString()}`
            : 'Not available'}
        </p>

        <Link
          to={`/car/${car.id}`}
          className="details-btn"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}