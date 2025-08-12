import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
const Update = () => {
  const [user,setUser] = useState({
    email: "",
    password: "",
    rpassword: ""
  });
  const [errMsg,setErrorMsg] = useState("");
  const navigate = useNavigate();

const onUpdatePassword = async(event) =>{
  event.preventDefault();
await axios.put('http://localhost:5000/update',user)
.then(res=>{
  setUser({email:'',password:'',rpassword:''})
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
      <Form  className='form-container text-start' onSubmit={onUpdatePassword}>
        <h1 className='form-head'>Password Updation</h1>
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
        <Form.Control type="password" placeholder="Retype Password" id = "rpassword" onChange={(e)=>setUser({...user,[e.target.id]: e.target.value})}/>
      </Form.Group>
      <p className="err-message">{errMsg}</p>
      <Button variant="primary" type="submit">Update</Button>
    </Form>
      </Container>
      
    </div>
  );
}
export default Update;