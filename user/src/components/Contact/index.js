/*import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';*/
import Header from '../Header';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { FaMobileAlt } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import './index.css';
import { useState } from 'react';
const Contact = () => {
  const [message,setMessage]= useState({
    name: '',
    email: '',
    number: '',
    message: ''
  });

const onContactForm = async(event) =>{
  event.preventDefault(); 
  setMessage({
    name: '',
    email: '',
    number: '',
    message: ''
  });
  alert('We will get back to you soon');
  
}
 

  return (
    <div>
      <Header value = {message.name}required/>
      <Container className='login-container'>
      <Form  className='form-container text-start' onSubmit={onContactForm}>
        <h1 className='form-head'>Contact Form</h1>
        <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Name" id="name" onChange = {(e)=> setMessage({...message,[e.target.id]: e.target.value})} value = {message.name}required/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Email" id="email" onChange = {(e)=> setMessage({...message,[e.target.id]: e.target.value})} value = {message.email}required/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Mobile Number</Form.Label>
        <Form.Control type="text" placeholder="Mobile Number" id="number" onChange = {(e)=> setMessage({...message,[e.target.id]: e.target.value})} value = {message.number}required/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Message</Form.Label>
        <Form.Control type="text" placeholder="Message" id="message" onChange = {(e)=> setMessage({...message,[e.target.id]: e.target.value})} value = {message.message}required/>
      </Form.Group>
      <p className="err-msg"></p>
      <Button variant="primary" type="submit">Contact</Button>
    </Form>
      </Container>
      
      <Container className='contact-container'>
        <h2 className='text-center'>Contact Details:</h2>
      <a href='mailto:'><SiGmail className='icon'/></a>
      <a href='tel:'><FaMobileAlt className='icon'/></a>
      <a href='https://goo.gl/maps/'><FaMapLocationDot className='icon'/></a>
      </Container>
      
      <Container className='contact-container'>
        <h2 className='text-center'>Follow us on:</h2>
      <a href='https://www.facebook.com/'><FaFacebookSquare className='icon'/></a>
      <a href='https://www.instagram.com/'><FaInstagram className='icon'/></a>
      <a href='https://www.twitter.com/'><FaTwitter className='icon'/></a>
      <a href='https://www.linkedin.com/'><FaLinkedin className='icon'/></a>
      </Container>
    </div>
  );
}
export default Contact;