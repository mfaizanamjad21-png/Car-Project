import "./Reviews.css";

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      car: "Honda Civic",
      rating: 4.5,
      text: "Smooth ride, great fuel economy, and modern tech."
    },
    {
      id: 2,
      car: "Toyota Camry",
      rating: 4.7,
      text: "Comfortable, reliable, and perfect for daily commuting."
    },
    {
      id: 3,
      car: "BMW 3 Series",
      rating: 4.8,
      text: "Sharp handling and premium interior—fun to drive."
    }
  ];

  return (
    <div className="page reviews-page">
      <h2>Owner & Expert Reviews</h2>
      <p>See what drivers and experts say about popular models.</p>

      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <h3>{review.car}</h3>
            <p className="rating">Rating: {review.rating} / 5</p>
            <p>{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
