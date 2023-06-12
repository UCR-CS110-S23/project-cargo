import React, { useEffect, useState } from 'react';
import CarImage from '../../random.png';
import Navbar from "../../global/navbar";
import { useParams } from 'react-router-dom';

const CarDetails = () => {
  const { carID } = useParams();


  return (
    <div>
        <Navbar/>
      <h2>Car Details</h2>
      <img src={CarImage} alt="Car" style={{ maxWidth: '25%', height: 'auto', marginLeft: '5rem' }} />
      <h2>Ratings (To be Added)</h2>
      <h2>Comments (To be Added)</h2>
    </div>
  );
};
export default CarDetails;