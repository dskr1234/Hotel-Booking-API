import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
const Login = () => {
  const [user,setUser] = useState({
    email: "",
    password: ""
  });
  const [errMsg,setErrorMsg] = useState("");
  const navigate = useNavigate(); 

const onLogin = async(event) =>{
  event.preventDefault(); 
  await axios.post('http://localhost:5000/login',user)
  .then(res=>{
    setUser({email:'',password:''})
    setErrorMsg('')
    alert(res.data.message);
    sessionStorage.setItem('token',res.data.token);
    sessionStorage.setItem('userId',res.data.user.id);
    sessionStorage.setItem('isLoggedIn',true);
    navigate('/');
  })
  .catch(err=>{
    setErrorMsg(err.response?.data?.message || 'Internal Server Error');
  })
}

  return (
    <div>
      <Header />
      <Container className='login-container'>
      <Form  className='form-container text-start' onSubmit={onLogin}>
        <h1 className='form-head'>LogIn Form</h1>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Email" id="email" onChange={(e)=>setUser({...user,[e.target.id]: e.target.value})}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" id="password" onChange={(e)=>setUser({...user,[e.target.id]: e.target.value})}/>
      </Form.Group>
      <p className="err-msg">{errMsg}</p>
      <Button variant="primary" type="submit">LogIn</Button>
      <p className='form-footer pt-3'>Don't have an account? <a href='/register'>SignUp</a></p>
      <p className='form-footer pt-3'>Forgot Password? <a href='/update'>Click Here</a></p>
    </Form>
      </Container>
      
    </div>
  );
}
export default Login;