import { useState, useEffect } from "react"
import { getCars } from "../API/cars"
import { useNavigate } from "react-router-dom";
import Navbar from "../global/navbar";
import React from "react";
//Home Page 
export const Home = () => {
  const [cars, setCars] = useState([])

  useEffect(() => {
    getCars().then((response) => {
      setCars(response)
    })
  }, [cars])
  const navigate = useNavigate()


  return (
    <div className='App'>
      <Navbar/>
      <div className='Browse'>
       
          <h2>Browse by Make</h2><br/>
          <h3>Toyota</h3>
          <img className="homeImage" onClick={() => navigate('/make', {"state": {"make": "Toyota", 'allCars': cars}})} src={require('../toyota.png')} alt='Toyota Logo'/>
          <h3>BMW</h3>
          <img className="homeImage" onClick={() => navigate('/make', {"state": {"make": "BMW", 'allCars': cars}})} src={require('../bmw.png')} alt='bmw Logo'/>               
          <h3>Tesla</h3>
          <img className="homeImage" onClick={() => navigate('/make', {"state": {"make": "Tesla", 'allCars': cars}})} src={require('../tesla.png')} alt='tesla Logo' />               
          
      </div>

      <div className='Browse'>
          
            <h2>Browse by Type</h2>
            <h3>Gas</h3>
            <img className="homeImage" onClick={() => navigate('/type', {"state": {"engineType":"Gas", 'allCars': cars}})} src={require('../mustang.png')} alt='gas car'/>
            <h3>Electric</h3>
            <img className="homeImage" onClick={() => navigate('/type', {"state": {"engineType":"Eletric", 'allCars': cars}})} src={require('../electric.png')} alt='electric car'/>
            <h3>Hybrid</h3>
            <img className="homeImage" onClick={() => navigate('/type', {"state": {"engineType":"Hybrid", 'allCars': cars}})} src={require('../hybrid.png')} alt='hybrid car'/>
          
      </div>
      <button className='redirectButtons' style={{ marginLeft: '30%'}}>View Hosts</button>
      <button className='redirectButtons' style={{ marginLeft: '65%'}}> List of Cars</button>
    </div>
  )
}