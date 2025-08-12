import Header from '../Header';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import './index.css';

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const id = sessionStorage.getItem('userId');
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        });

        const data = await response.json();
        setUser(data);
        console.log(data);
      } catch (error) {
        alert('Failed to fetch user data.');
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <Header />
      <Container className='profile-container'>
        <Container className='profile-card'>
<div className='profile-name'>
          {user.name ? user.name[0].toUpperCase() : ''}
        </div>
        <ul className='profile-list text-start'>
          <li className='list-item'>User ID: {user.id}</li>
          <li className='list-item'>Name: {user.name}</li>
          <li className='list-item'>Email: {user.email}</li>
        </ul>
        </Container>
        
        <Container className='booking-history-container'>
<table className="table table-bordered">
            <thead>
                <tr>
                <th>Booking ID</th>
                <th>No of Rooms</th>
                <th>Check-in Date</th>
                <th>Check-in Time</th>
                <th>Check-out Date</th>
                <th>Check-out Time</th>
                </tr>
            </thead>
            <tbody>
                {user.bookings && user.bookings.length > 0 ? (
                user.bookings.map((booking) => (
                    <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.noOfRooms}</td>
                    <td>{booking.checkIn}</td>
                    <td>{booking.checkInTime}</td>
                    <td>{booking.checkOut}</td>
                    <td>{booking.checkOutTime}</td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="6">No bookings found.</td>
                </tr>
                )}
            </tbody>                                
</table>
        </Container>
      </Container>
    </div>
  );
};

export default Profile;
