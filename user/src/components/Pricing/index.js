import Container from 'react-bootstrap/esm/Container';
import Carousel from 'react-bootstrap/Carousel';
import Header from '../Header';
import './index.css';
const Pricing = () => {
  return (
    <div className='main-container'>
      <Header />
      <Container className='pricing-container'>
        <Container className='pricing-cont-1'>
          <h2>Basic Plan</h2>
          <h3>Cost: 1600 per day!</h3>
          <h3>Availabilities includes in plan:</h3>
          <p>Spacious A/c Room with working area</p>
          <p>House Keeping</p>
          <h3>Payable:</h3>
          <p>Food</p>
          <p>Drinks</p>
          <p>Room Service</p>
          <p>Parking</p>
        </Container>
         <Container className='pricing-cont-1'>
          <h2>Super Plan</h2>
          <h3>Cost: 2200 per day!</h3>
          <h3>Availabilities includes in plan:</h3>
          <p>Spacious A/c Room with working area</p>
          <p>Room Service</p>
          <p>House Keeping</p>
          <p>Free Wi-Fi</p>
          <p>Free Parking</p>
          <h3>Payable:</h3>
          <p>Food</p>
          <p>Drinks</p>
        </Container>
        <Container className='pricing-cont-1'>
          <h2>Delux Plan</h2>
          <h3>Cost: 3000 per day!</h3>
          <h3>Availabilities includes in plan:</h3>
          <p>Spacious A/c Room with working area</p>
          <p>Room Service</p>
          <p>House Keeping</p>
          <p>Free Wi-Fi</p>
          <p>Free Parking</p>
          <p>Free Breakfast</p>
          <p>Free Lunch</p>
          <p>Free Dinner</p>
        </Container>
        </Container>
    </div>
  );
}
export default Pricing;