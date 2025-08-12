// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

dotenv.config();

const { MONGO_URI, JWT_SECRET, PORT = 5000 } = process.env;
if (!MONGO_URI) { console.error('❌ MONGO_URI missing in .env'); process.exit(1); }
if (!JWT_SECRET) { console.error('❌ JWT_SECRET missing in .env'); process.exit(1); }

const app = express();
app.use(cors());
app.use(express.json());

// ================== Mongoose Models ==================
const UserSchema  = new mongoose.Schema({
  id: { type: String, required: true, unique: true },       // your public id like SU1
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bookings: { type: [Object], default: [] },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

// ================== Helpers ==================
const trimStr = (v) => (typeof v === 'string' ? v.trim() : '');
const toNumber = (v) => (v === '' || v === null || v === undefined ? NaN : Number(v));
const isValidDate = (d) => d instanceof Date && !Number.isNaN(d.getTime());

// ================== Routes ==================

// Create user
app.post('/adduser', async (req, res) => {
  const name = trimStr(req.body.name);
  const email = trimStr(req.body.email);
  const pass = trimStr(req.body.password);
  const cpass = trimStr(req.body.cpassword);

  if (!name || !email || !pass || !cpass) {
    return res.status(400).json({ message: '*Please fill all the fields' });
  }
  if (pass !== cpass) {
    return res.status(400).json({ message: '*Password and Confirm Password do not match' });
  }

  try {
    const count = await User.countDocuments();
    const hashedPassword = await bcrypt.hash(pass, 10);
    const newId = `SU${count + 1}`;

    await User.create({ id: newId, name, email, password: hashedPassword });
    return res.status(201).json({ message: `*User created with Id: ${newId}` });
  } catch (err) {
    if (err && err.code === 11000) {
      return res.status(400).json({ message: '*User already exists' });
    }
    console.error(err);
    return res.status(500).json({ message: '*Internal server error' });
  }
});

// Login
app.post('/login', async (req, res) => {
  const email = trimStr(req.body.email);
  const password = trimStr(req.body.password);

  if (!email || !password) {
    return res.status(400).json({ message: '*All the fields are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: '*User not found' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: '*Invalid credentials' });

    const payload = { email: user.email, id: user.id };
    const token = jwt.sign(payload, JWT_SECRET);

    // hide password in response
    const safeUser = { ...user.toObject(), password: undefined };
    return res.status(200).json({ message: 'Login successful, Redirecting to home..!', token, user: safeUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '*Database error' });
  }
});

// Get user by public id (auth required)
app.get('/user/:id', async (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.id !== req.params.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const user = await User.findOne({ id: req.params.id }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Invalid token' });
  }
});

// Update password
app.put('/update', async (req, res) => {
  const email = trimStr(req.body.email);
  const password = trimStr(req.body.password);
  const rpassword = trimStr(req.body.rpassword);

  if (!email || !password || !rpassword) {
    return res.status(400).json({ message: '*All the fields are required' });
  }
  if (password !== rpassword) {
    return res.status(400).json({ message: '*Password and Retyped Password do not match' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: '*User not found' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.updateOne({ email }, { password: hashedPassword });
    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '*Database error' });
  }
});

// Create booking (auth required)
app.post('/booking', async (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  if (!token) return res.status(401).json({ message: 'Token missing' });

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Invalid token' });
  }

  const mobileStr = trimStr(req.body.mobile);
  const roomsNum = toNumber(req.body.noOfRooms);
  const checkInStr = trimStr(req.body.checkIn);       // expect YYYY-MM-DD
  const checkInTimeStr = trimStr(req.body.checkInTime); // expect HH:mm (24h)
  const checkOutStr = trimStr(req.body.checkOut);     // expect YYYY-MM-DD

  if (!mobileStr || !checkInStr || !checkInTimeStr || !checkOutStr || Number.isNaN(roomsNum)) {
    return res.status(400).json({ message: '*Please fill all the fields' });
  }
  if (roomsNum < 1) {
    return res.status(400).json({ message: '*Number of rooms should be greater than 0' });
  }

  const inDate = new Date(checkInStr);
  const outDate = new Date(checkOutStr);
  if (!isValidDate(inDate) || !isValidDate(outDate)) {
    return res.status(400).json({ message: '*Invalid date format' });
  }
  if (inDate > outDate) {
    return res.status(400).json({ message: '*Check-in date should be less than check-out date' });
  }

  try {
    const user = await User.findOne({ email: decoded.email });
    if (!user) return res.status(404).json({ message: '*User not found' });

    // Parse and format time (Asia/Kolkata)
    const parsedCheckInTime = new Date(`1970-01-01T${checkInTimeStr}:00`);
    const formattedCheckInTime = isValidDate(parsedCheckInTime)
      ? parsedCheckInTime.toLocaleTimeString('en-IN', {
          hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Asia/Kolkata'
        })
      : checkInTimeStr;

    const bookingId = `SBID${Math.floor(Math.random() * 100000) + 10000}`;

    const booking = {
      id: bookingId,
      name: user.name,
      mobile: mobileStr,
      noOfRooms: roomsNum,
      checkIn: inDate.toISOString().slice(0, 10),
      checkInTime: formattedCheckInTime,
      checkOut: outDate.toISOString().slice(0, 10),
      checkOutTime: formattedCheckInTime, // keep same as your original
    };

    await User.findOneAndUpdate(
      { email: decoded.email },
      { $push: { bookings: booking } }
    );

    return res.status(200).json({ message: `Room booked with booking id ${bookingId}` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Database Error' });
  }
});

// ================== Global Error Handler ==================
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: '*Internal server error' });
});

// ================== Startup ==================
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    });


  })
  .catch((err) => {
    console.error('Mongo connection error:', err);
    process.exit(1);
  });
