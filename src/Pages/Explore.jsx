import "./Explore.css";

export default function Explore() {
  return (
    <div className="explore-container">

      <header className="explore-header">
        <h1>Explore CarHub</h1>
        <p>Search for anything CarHub</p>
        <input
          type="text"
          placeholder="Search cars, brands, tools..."
          className="explore-search"
        />
      </header>

      <div className="explore-grid">

        {/* Vehicles */}
        <div className="explore-section">
          <h2>Vehicles</h2>
          <ul>
            <li>All Vehicles</li>
            <li>Hybrid & Electric</li>
            <li>Fuel Efficient Cars</li>
            <li>Sedans</li>
            <li>SUVs</li>
            <li>Compact SUVs</li>
            <li>Crossovers</li>
            <li>Pickup Trucks</li>
            <li>Luxury Cars</li>
            <li>Certified Pre-Owned</li>
          </ul>
        </div>

        {/* Shopping Tools */}
        <div className="explore-section">
          <h2>Shopping Tools</h2>
          <ul>
            <li>Build & Price</li>
            <li>See Offers</li>
            <li>Search Inventory</li>
            <li>Estimate Payments</li>
            <li>Apply for Financing</li>
            <li>Trade-In Value</li>
            <li>Lease or Finance</li>
          </ul>
        </div>

        {/* Discover */}
        <div className="explore-section">
          <h2>Discover CarHub</h2>
          <ul>
            <li>About Us</li>
            <li>News & Events</li>
            <li>Careers</li>
            <li>Investor Relations</li>
            <li>CarHub Merchandise</li>
            <li>Community Programs</li>
            <li>Future Vehicles</li>
          </ul>
        </div>

        {/* Help & Support */}
        <div className="explore-section">
          <h2>Help & Support</h2>
          <ul>
            <li>FAQ</li>
            <li>Customer Service</li>
            <li>Accessibility</li>
            <li>Buyer’s Guide</li>
            <li>Roadside Assistance</li>
            <li>Safety Recalls</li>
          </ul>
        </div>

        {/* Owners */}
        <div className="explore-section">
          <h2>Owners</h2>
          <ul>
            <li>My Garage</li>
            <li>Schedule Service</li>
            <li>Parts & Accessories</li>
            <li>Body Shop Locator</li>
            <li>Pay My Bill</li>
            <li>Wi-Fi Hotspot Plans</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
