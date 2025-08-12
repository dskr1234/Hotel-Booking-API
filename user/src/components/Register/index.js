import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
const Register = () => {
  const [user,setUser] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: ""
  });
  const [errMsg,setErrorMsg] = useState("");
  const navigate = useNavigate();

const onAddUser = async(event) =>{
  event.preventDefault();
await axios.post('http://localhost:5000/adduser',user)
.then(res=>{
  setUser({name:'',email:'',password:'',cpassword:''})
  setErrorMsg('')
  alert(res.data.message);
  navigate('/login');
})
.catch(err=>{
  setErrorMsg(err.response?.data?.message || 'Internal Server Error');
})
}


  return (
    <div>
      <Header />
      <Container className='register-container'>
      <Form  className='form-container text-start' onSubmit={onAddUser}>
        <h1 className='form-head'>Registration Form</h1>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Name" id="name" onChange={(e)=>setUser({...user,[e.target.id]: e.target.value})}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Email" id="email" onChange={(e)=>setUser({...user,[e.target.id]: e.target.value})}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" id="password" onChange={(e)=>setUser({...user,[e.target.id]: e.target.value})}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" id = "cpassword" onChange={(e)=>setUser({...user,[e.target.id]: e.target.value})}/>
      </Form.Group>
      <p className="err-message">{errMsg}</p>
      <Button variant="primary" type="submit">Register</Button>
      <p className='form-footer pt-3'>Already have an account? <a href='/login'>LogIn</a></p>
    </Form>
      </Container>
      
    </div>
  );
}
export default Register;