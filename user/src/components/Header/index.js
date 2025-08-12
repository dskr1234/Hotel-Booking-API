import {useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Button from 'react-bootstrap/Button';


const Header = () => {  
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const navigate = useNavigate();
  const onLoggedOut = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('isLoggedIn');
    navigate('/');
  }
  return (
    <div className='home'>
      <Navbar collapseOnSelect expand='lg' className='bg-primary' variant='dark'>
      <Container>
        <Navbar.Brand href='/'>StayIn</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-end'>
          <Nav>
          <Nav.Link href='/' className='link'>Home</Nav.Link>
            <Nav.Link href='/about' className='link'>About</Nav.Link>
            <Nav.Link href='/pricing' className='link'>Pricing</Nav.Link>
            <Nav.Link href='/contact' className='link'>Contact</Nav.Link>
            { isLoggedIn ? ( 
              <>
              <Nav.Link href='/profile' className='link'>Profile</Nav.Link>
              <Button variant='bg-transparent' className=' text-white link' onClick={onLoggedOut}>LogOut</Button>
              </>
              
            ) : (
              <>
              <Nav.Link href='/login' className='link'>Login</Nav.Link>
            <Nav.Link href='/register' className='link'>Sign Up</Nav.Link>
              </>
 )}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   

    </div>
  );
}   
export default Header;