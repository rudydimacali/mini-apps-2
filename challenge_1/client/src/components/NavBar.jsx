import React from 'react';

const NavBar = ({ handleSubmit, handleChange }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="#">Historical Events Finder</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#"><span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#"></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#"></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#"></a>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="text" placeholder="Search" id='query' onChange={handleChange} />
          <button className="btn btn-secondary my-2 my-sm-0" type="submit" onClick={handleSubmit}>Search</button>
        </form>
      </div>
    </nav>
  )
};

export default NavBar;