import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './CarDetails.css';

export default function CarDetails({ cars }) {
  const { id } = useParams();
  
  // Find the car matching the URL parameter ID
  const car = cars?.find((item) => item.id === parseInt(id));

  if (!car) {
    return (
      <div className="details-container">
        <h2>Car Not Found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="details-container">
      <Link to="/" className="back-btn">&larr; Back to Cars</Link>
      <div className="details-content">
        <img src={car.image} alt={car.name} className="details-image" />
        <div className="details-info">
          <h2>{car.name}</h2>
          <p><strong>Year:</strong> {car.year}</p>
          <p><strong>Price:</strong> ${car.price.toLocaleString()}</p>
          <p><strong>Description:</strong> Premium vehicle equipped with advanced performance and security features.</p>
        </div>
      </div>
    </div>
  );
}