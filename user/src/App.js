import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Pricing from './components/Pricing'; 
import Login from './components/LogIn';
import Register from './components/Register';
import Update from './components/Update';
import Notfound from './components/NotFound';
import Profile from './components/Profile';
import './App.css';

const  App = () => {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update" element={<Update />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
