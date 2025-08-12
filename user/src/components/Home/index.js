import { useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const Home = () => {  
  const [booking,setBooking]= useState({

  mobile: '',
  noOfRooms: '',
  checkIn: '',
  checkInTime: '',
  checkOut: ''
  });
  const [error,setError]= useState("");
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const user = sessionStorage.getItem('userId');
  const token = sessionStorage.getItem('token');
  const onAddBooking = async(event) =>{
    event.preventDefault();
    if(!user || !token || isLoggedIn !== 'true'){
      alert('Please login to book a room');
      navigate('/login');

    }else{
await axios.post('http://localhost:5000/booking',booking,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res=>{
      console.log(booking.checkInTime);
      setBooking({mobile:'',noOfRooms:'',checkIn:'',checkInTime:'',checkOut:''})
      setError('')
      alert(res.data.message);
    })
    .catch(err=>{
      setError(err.response?.data?.message || 'Internal Server Error');
    })
    }
    
  }
  return (
    <div className='home'>
      <Header/>
    <Container className='home-container'>
      <h1>Welcome to StayIn</h1>
      <p>Enjoy your Stay</p>
      <Form  className='form-container text-start' onSubmit={onAddBooking}>
        <h1 className='form-head'>Booking Form</h1>
      <Form.Group className="mb-3">
        <Form.Label>Mobile</Form.Label>
        <Form.Control type="text" placeholder="Mobile Number" onChange={(e)=>setBooking({...booking,[e.target.id]: e.target.value})} value = {booking.mobile} id='mobile'/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>No of Rooms</Form.Label>
        <Form.Control type="number" placeholder="Number of Rooms" onChange={(e)=>setBooking({...booking,[e.target.id]: e.target.value})} value = {booking.noOfRooms} id='noOfRooms'/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Check-In Date</Form.Label>
        <Form.Control type="date" placeholder="Check-In date" onChange={(e)=>setBooking({...booking,[e.target.id]: e.target.value})} value = {booking.checkIn} id='checkIn'/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Check-In Time</Form.Label>
        <Form.Control type="time" placeholder="Check-In date" onChange={(e)=>setBooking({...booking,[e.target.id]: e.target.value})} value = {booking.checkInTime} id='checkInTime'/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Check-Out Date</Form.Label>
        <Form.Control type="date" placeholder="Check-Out date" onChange={(e)=>setBooking({...booking,[e.target.id]: e.target.value})} value = {booking.checkOut} id='checkOut'/>
      </Form.Group>
      <p className='err-msg'>{error}</p>
      <Button variant="primary" type="submit">Book</Button>
    </Form>

      </Container>

    </div>
  );
}   
export default Home;