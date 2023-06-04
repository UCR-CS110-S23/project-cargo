import { useState } from 'react'
import Navbar from '../global/navbar'
import { getComments, getUsers, postOrder, postComment } from '../API/cars'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Rate} from 'antd';
//Book a car page Again images doesnt work but sending the request to the db does work. 
export const BookACar = () => {
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
    },
    but: {
      backgroundColor: 'purple',
      color: 'white',
      padding: '10px 20px',
      textAlign: 'center',
      alignSelf: 'center',
      fontSize: '16px',
      justifyContent: 'center'
    },
    wrap: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      display: 'flex',
      width: '100%',
      margin: 'auto',
    },
    form: {
      // marginLeft: 12,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      backgroundColor: 'purple',
      flex: 1
    },
    sub: {
        
      color: 'black',
      padding: '10px 20px',
      textAlign: 'center',
      display: 'inline-block',
      backgroundColor: 'yellow'
    }
     
  }
  const location = useLocation();
  const [date, setDate] = useState('');
  const [length, setLength] = useState('');
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [newComment, setNewComments] = useState('');
  const [newRating, setNewRating] = useState(0);

  const setDateHandler = (event) => {
    setDate(event.target.value)
  }
  const setLengthHandler = (event) => {
    setLength(event.target.value)
  }
  const setNewHandler = (event) => {
    setNewComments(event.target.value)
  }

  const handleSubmit = (event) =>{
    event.preventDefault()
    // TODO make the uid a valid user. This is currently the owner of the car.
    postOrder(location.state.uid, location.state._id, new Date(date), length, location.state.pricePerDay * length, 1).then((response) => {
      console.log('response ', response)
      setDate('')
      setLength('')
    })
    console.log(date)
    console.log(length)
  }
  const handlePostComment = (event) => {
    event.preventDefault()
    console.log(newComment);
    console.log(newRating);
    postComment(location.state.uid, location.state._id, newComment, newRating).then((response)=>{
        console.log('response', response)
      getComments().then((response) => {
        setComments(response)
      })
    })
    
  }

  useEffect(() => {
    getComments().then((response) => {
      setComments(response)
    })
    getUsers().then((response)=>{
      console.log(response)
      setUsers(response)
    })
  }, [])

  const displayComments = () => {
    // getting comments from server
    // then we got and get cid from props. 
    // we compare the single comment cid to the props cid and display the 
    // comment if they match.
    return (
      <div>
        {comments.map((singleComment, index) => {
            
          return(
            location.state._id === singleComment.cid &&
              <div key={index} style={style.products}>
                <div>
                  {singleComment.comment}
                </div>
                <Rate allowHalf value={singleComment.rating} disabled/>
              </div>
          )
        })}
      </div>
    )
  }
  console.log(location.state)

  const displayHostInfo = () => {
    return(
        <div>
            {users.map((host, index) => {
                return(
                    location.state.uid === host._id &&
                    <div key={index} style={style.products}>
                        <h2>Name: {host.realName}</h2><br/>
                        <h3>User Name: {host.username}</h3><br/>
                        <h4>Host Email: {host.email}</h4>
                    </div>
                )
            })
        }
        </div>
    )
  }

 

  return (
    <div style={{height: '100%'}}>
      <Navbar/>
      <div style={style.productsContainer}>
        <div style={style.products}>
          <img className="homeImage" src={require('../toyota.png')} alt='Toyota Logo'/>           
        </div>

        <div>
          <h1 style={{backgroundColor: 'white'}}>Host Info</h1>
          <div style={{backgroundColor: 'white'}}>
            {displayHostInfo()}
          </div>
          <h1 style={{backgroundColor: 'white'}}>Car Info</h1>
          <div style={{backgroundColor: 'white'}}>
            Brand: {location.state.make}
          </div>
          <div style={{backgroundColor: 'white'}}>
            Make: {location.state.model}
            </div>
          <div style={{backgroundColor: 'white'}}>
            Year: {location.state.year}
            </div>
          <div style={{backgroundColor: 'white'}}>
            Engine: {location.state.engineType}
            </div>
          <div style={{backgroundColor: 'white'}}>
            Price Per Day: {location.state.pricePerDay}
            </div>
          <div style={{backgroundColor: 'white'}}>
            Location(Zip Code): {location.state.location}
            </div>
          <div style={{backgroundColor: 'white'}}>
            Features: {location.state.features}
            </div>

          <h1 style={{backgroundColor: 'white'}}>Reviews</h1>
          <div style={{backgroundColor: 'white'}}>
            {displayComments()}
            <form onSubmit={handlePostComment} style={style.form}>
                <label>
                    <div>Leave a Comment</div>
                    <input type='text' value={newComment} onChange={setNewHandler}/>
                    <Rate allowHalf onChange={setNewRating}/>
                </label>
                <button style={style.sub}>Leave Comment</button>
            </form>


          </div>
        </div>
      </div>
      <div style={style.wrap}>
        <form onSubmit={handleSubmit} style={style.form}>
          <div style={style.but}>
            <label>
              <div>Start Date</div> 
              <input type="text" value={date} onChange={setDateHandler} placeholder='MM/DD/YYYY'/>       
            </label>
          </div>
          <div style={style.but}>
            <label>
              <div>Length of Booking(Days)</div> 
              <input type="text" value={length} onChange={setLengthHandler}/>       
            </label>
          </div>
          <div style={style.but}>
            <button style={style.sub}>Book Car</button>
          </div>
        </form>
      </div>
    </div>
  )
}