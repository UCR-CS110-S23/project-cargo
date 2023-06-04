import Navbar from "../global/navbar"
import { useLocation, useNavigate } from "react-router-dom"
//browse by type page 
export const BrowseByType = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const style = {
        productsContainer: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'spaceBetween',
        },
        products: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '45%',
          margin: '0 0 1em 0',
          padding: '1em',
        }
      }
    
      const displayCars = () => {
        return (
            <div style={style.productsContainer}>
              {location.state.allCars.map((car, index) => {
                return (
                  location.state.engineType === car.engineType &&
                  <div key={index} style={style.products}>
                    {car.model}
                    <img className="homeImage" onClick={() => {navigate('../make/book', {"state": car})}} src={require('../toyota.png')} alt='Toyota Logo'/>           
                  </div>
                )
              })}
            </div>
          )
      }
      return (
        <div>
          <div>
            <Navbar/>
            <h2>Browse by Type - {location.state.engineType}</h2><br/>
            {displayCars()}
          </div> 
        </div>
      )
}