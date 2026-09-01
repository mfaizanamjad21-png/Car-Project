import { useState } from "react";
import "./FuelCalculator.css";

export default function FuelCalculator() {
  const [distance, setDistance] = useState("");
  const [mpg, setMpg] = useState("");
  const [price, setPrice] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const d = Number(distance);
    const m = Number(mpg);
    const p = Number(price);

    if (!d || !m || !p) return;

    const gallons = d / m;
    const cost = gallons * p;

    setResult({ gallons, cost });
  };

  return (
    <div className="page fuel-page">
      <h2>Fuel Cost Calculator</h2>
      <p>Estimate trip fuel usage and cost based on your vehicle.</p>

      <form className="fuel-form" onSubmit={handleCalculate}>
        <label>
          Trip distance (miles)
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        </label>

        <label>
          Vehicle efficiency (mpg)
          <input
            type="number"
            value={mpg}
            onChange={(e) => setMpg(e.target.value)}
          />
        </label>

        <label>
          Fuel price ($ per gallon)
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        <button type="submit">Calculate</button>
      </form>

      {result && (
        <div className="fuel-result">
          <p>Estimated fuel used: {result.gallons.toFixed(2)} gallons</p>
          <p>Estimated trip cost: ${result.cost.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
