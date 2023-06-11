import Navbar from "../global/navbar"
import { useLocation, useNavigate } from "react-router-dom"
//browse by type page 
export const BrowseByType = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const style = {
      productsContainer: {
        display: 'flex',
        // flexWrap: 'wrap',
        justifyContent: 'center', // Center items horizontally
        alignItems: 'center', // Center items vertically
      },
      products: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '45%',
      }
    }
    
      const displayCars = () => {
        return (
            <div style={style.productsContainer}>
              {location.state.allCars.map((car, index) => {
                return (
                  location.state.engineType === car.engineType &&
                  <div key={index} style={style.products}>
                    <p style={{fontWeight: 'bold', fontSize:'24px'}}>{car.model}</p>
                    <img className="homeImage" style={{border: '5px solid', borderColor:'#222222', borderRadius:'12px'}} onClick={() => {navigate('../make/book', {"state": car})}} src={require('../toyota.png')} alt='Toyota Logo'/>           
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
            <h2 style={{textAlign:'center', textDecoration:'underline', textDecorationColor:'#222222'}}>Browse by Type - {location.state.engineType}</h2><br/>
            {displayCars()}
          </div>
          
        </div>
      )
}