import React from 'react';
import './index.css'; //
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link className='nav-item' to="/">Home</Link>
                    </li>
                    <li className="nav-item1">
                        <Link className='nav-item1' to="/post-car">Add your car</Link>
                    </li>
                    <li className="nav-item1">
                        <Link className='nav-item1' to="/view-cars">View Cars</Link>
                    </li>
                </ul>
                <div className="CAR">CarGo</div>
            </div>
            <div className="navbar-right">
                <div><Link className='nav-item' to="/register">Register</Link></div>
                <div><Link className='nav-item' to="/login">Login</Link></div>
            </div>
        </nav>
    );
};

export default Navbar;
