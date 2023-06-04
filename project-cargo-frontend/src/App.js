import React from 'react';
// import Navbar from "./global/navbar";
import { Home } from './Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { BrowseByMake } from './Home/BrowseByMake';
import { BookACar } from './Home/BookACar';
import { BrowseByType } from './Home/BrowseByType';

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='' element={<Home />} />
                    <Route path="make" element={<BrowseByMake />} />
                    <Route path="make/book" element={<BookACar />} />
                    <Route path="type" element={<BrowseByType />} />
                    
                </Routes>
            </Router>
        </div>
    );
}

export default App;
