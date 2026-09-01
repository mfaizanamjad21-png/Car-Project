import "./CompareCars.css";

export default function CompareCars({ favorites }) {
  if (favorites.length < 2) {
    return (
      <div className="compare-container">
        <h2>Compare Cars</h2>
        <p>Add at least 2 cars to favorites to compare.</p>
      </div>
    );
  }

  return (
    <div className="compare-container">
      <h2>Compare Cars</h2>

      <div className="compare-grid">
        {favorites.map((car) => (
          <div key={car.id} className="compare-card">
            <img src={car.image} alt={car.name} />
            <h3>{car.name}</h3>
            <p>Year: {car.year}</p>
            <p>Price: ${car.price.toLocaleString()}</p>
            <p>Model: {car.model}</p>
            <p>Make: {car.make}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
