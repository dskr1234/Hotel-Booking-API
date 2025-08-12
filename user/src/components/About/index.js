import Container from 'react-bootstrap/esm/Container';
import Carousel from 'react-bootstrap/Carousel';
import Header from '../Header';
import './index.css';
const About = () => {
  return (
    <div className='main-container'>
      <Header />
      <Container className='top-container'>
      <h1 className='pt-5'>Welcome to StayIn – Your Perfect Stay Awaits!</h1>
      </Container>
      <Container className='bottom-container'>
        <h2 className='pt-5'>About Us</h2>
        <Container className='w-50'>
          <Carousel data-bs-theme="light">
      <Carousel.Item>
        <img
          className="image"
          src="/img1.jpeg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="image"
          src="/img2.png"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="image"
          src="/img3.jpeg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
        </Container>
        <p className='pt-3'>
          At StayIn, we believe that every traveler deserves a home away from home. Our mission is to provide you with the best accommodation options that suit your needs and preferences. Whether you're looking for a cozy apartment, a luxurious villa, or a budget-friendly hostel, we've got you covered.
        </p>
        <p className='pt-3'>
          Our team is dedicated to curating a selection of properties that meet our high standards of quality and comfort. We work closely with property owners to ensure that you have a seamless booking experience and enjoy your stay to the fullest.
        </p>
        <p className='pt-3'>
          Thank you for choosing StayIn. We look forward to helping you find your perfect stay!
        </p>

</Container>
    </div>
  );
}
export default About;