import { useState } from 'react'
import Navbar from '../global/navbar'
import { getComments, getUsers, postOrder, postComment } from '../API/cars'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Rate} from 'antd'
//import{Container, Row, Col} from 'react-bootstrap'
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
      backgroundColor: '#00dcff',
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
      backgroundColor: '#00dcff',
      flex: 1,
      width: '100%'
    },
    sub: {
        
      color: 'black',
      padding: '10px 20px',
      textAlign: 'center',
      display: 'inline-block',
      backgroundColor: 'yellow'
    },
    commentContainer: {
      backgroundColor: '#fff',
      padding: '1em',
      marginBottom: '1em',
      border: '2px solid #ddd',
      borderColor: '#00dcff',
      fontFamily: 'RlBasisGrotesque, Avenir, Helvetica Neue, Helvetica, sans-serif'
    },
    commentUser: {
      fontWeight: 'bold',
      marginBottom: '0.5em',
      fontSize: '18px',
      fontFamily: 'RlBasisGrotesque, Avenir, Helvetica Neue, Helvetica, sans-serif'
    },
    commentContent: {
      marginBottom: '0.5em',
      fontSize: '16px',
      fontFamily: 'RlBasisGrotesque, Avenir, Helvetica Neue, Helvetica, sans-serif'
    }
    
  }
  const CarEmoji = () => <span role='img' aria-label='car'>🚗</span>
  const MakeEmoji = () => <span role='img' aria-label='make'>🚘</span>
  const YearEmoji = () => <span role='img' aria-label='year'>📅</span>
  const EngineEmoji = () => <span role='img' aria-label='engine'>⚙️</span>
  const PriceEmoji = () => <span role='img' aria-label='price'>💲</span>
  const LocationEmoji = () => <span role='img' aria-label='location'>🌎</span>
  const FeaturesEmoji = () => <span role='img' aria-label='features'>📋</span>
  
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
      //console.log('response ', response)
      setDate('')
      setLength('')
    })
    //console.log(date)
    //console.log(length)
  }
  const handlePostComment = (event) => {
    event.preventDefault()
    //console.log(newComment);
    //console.log(newRating);
    postComment(location.state.uid, location.state._id, newComment, newRating).then((response)=>{
        //console.log('response', response)
      getComments().then((response) => {
        setComments(response)
      })
      setNewComments('')
      setNewRating('')
    })
    
  }

  useEffect(() => {
    getComments().then((response) => {
      setComments(response)
    })
    getUsers().then((response)=>{
      //console.log(response)
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
          // console.log(singleComment.uid)
          return (
            location.state._id === singleComment.cid && (
              <div key={index}>
                <div style={style.commentUser}>
                  @{users.find((user) => user._id === singleComment.uid)?.username}<br/>
                </div>
                  <div style={style.commentContent}>{singleComment.comment}</div>
                <Rate allowHalf value={singleComment.rating} disabled />
                <hr/>
              </div>
            )
          )
        })}
      </div>
    )
  }
  //console.log(location.state)

  const displayHostInfo = () => {
    return(
        <div>
            {users.map((host, index) => {
                return(
                    location.state.uid === host._id &&
                    <div key={index}>
                       
                        <div style={{fontSize: '20px', fontWeight: 'bold'}}>Host's Name: {host.realName}</div>
                        <br/>
                        <div style={{fontSize: '18px', fontWeight: 'bold', color: 'grey'}}>@{host.username}</div> 
                        <div style={{fontSize: '16px'}}>Joined {host.joinDate}</div>
                        <div style={{fontSize:'16px'}}>Contact: {host.email}</div>
                    </div>
                )
            })
        }
        </div>
    )
  }

 

  return (


    <div style={{height: '100%', backgroundColor: 'white'}}>
      <Navbar/>
      <div style={style.productsContainer}>
        <div style={style.products}>
          <img style={{width: '100%'}} src={require('../toyota.png')} alt='Toyota Logo'/>
          <form onSubmit={handleSubmit} style={style.form}>
          <div style={style.but}>
            <h2 >Want to Book this Car?</h2>
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
        <form onSubmit={handlePostComment} style={style.form}>
          <div style={style.but}>
              <h2>Leave a Comment</h2>
                <input type='text' value={newComment} onChange={setNewHandler}/>
          </div>
          <div style={style.but}>
             <label>
                <Rate allowHalf onChange={setNewRating} style={{color:'yellow', outlineColor:'yellow'}}/>
              </label>
          </div>
          <div style={style.but}>
            <button style={style.sub}>Leave Comment</button>
          </div>
          </form>           
        </div>

        <div>
          <h1 style={{color:'Black', textDecoration: 'underline', textDecorationColor: '#00dcff'}}>Host Info</h1>
          <div style={style.commentContainer}>
            {displayHostInfo()}
          </div>
          <h1 style={{color:'black', textDecoration: 'underline', textDecorationColor: '#00dcff'}}>Car Info</h1>
          <div style={style.commentContainer}>
            <div style={{ fontFamily: 'RlBasisGrotesque, Avenir, Helvetica Neue, Helvetica, sans-serif'}}>
              <b>Brand</b> <CarEmoji/>: {location.state.make}
            </div>
            <div style={{ fontFamily: 'RlBasisGrotesque, Avenir, Helvetica Neue, Helvetica, sans-serif'}}>
              <b>Make</b> <MakeEmoji/>: {location.state.model}
              </div>
            <div style={{ fontFamily: 'RlBasisGrotesque, Avenir, Helvetica Neue, Helvetica, sans-serif'}}>
              <b>Year</b> <YearEmoji/>: {location.state.year}
              </div>
            <div style={{ fontFamily: 'RlBasisGrotesque, Avenir, Helvetica Neue, Helvetica, sans-serif'}}>
              <b>Engine</b> <EngineEmoji/>: {location.state.engineType}
              </div>
            <div style={{ fontFamily: 'RlBasisGrotesque, Avenir, Helvetica Neue, Helvetica, sans-serif'}}>
              <b>Price Per Day</b> <PriceEmoji/>: {location.state.pricePerDay}
              </div>
            <div style={{ fontFamily: 'RlBasisGrotesque, Avenir, Helvetica Neue, Helvetica, sans-serif'}}>
              <b>Location (Zip Code)</b> <LocationEmoji/>: {location.state.location}
              </div>
            <div style={{ fontFamily: 'RlBasisGrotesque, Avenir, Helvetica Neue, Helvetica, sans-serif'}}>
              <b>Features</b> <FeaturesEmoji/>: {location.state.features}
              </div>
          </div>
          <h1 style={{color:'black', textDecoration: 'underline', textDecorationColor: '#00dcff'}}>Reviews</h1>
          <div style={style.commentContainer}>
            {displayComments()}
            {/* <form onSubmit={handlePostComment} style={style.form}>
                <label>
                    <div>Leave a Comment</div>
                    <input type='text' value={newComment} onChange={setNewHandler}/>
                    <Rate allowHalf onChange={setNewRating}/>
                </label>
                <button style={style.sub}>Leave Comment</button>
            </form> */}


          </div>
        </div>
      </div>
      {/* <div style={style.wrap}>
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
      </div> */}
    </div>
  )
}