import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand" style={{display:"flex", justifyContent:"center", background:"#032541", color:"white", padding:"20px", borderRadius:"10px", fontSize:"30px", fontWeight:"bold"}}>MOVIE HUNT</Link>
        <div className="navbar-links" style={{marginTop:"30px"}}>
          <Link to="/" className="nav-link" style={{background:"black", color:"white", marginLeft:"50px", padding:"20px", borderRadius:"10px"}}>Home</Link>
          <Link to="/watchlist" className="nav-link" style={{background:"black", color:"white", marginLeft:"50px", padding:"20px", borderRadius:"10px"}}>Watchlist</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;