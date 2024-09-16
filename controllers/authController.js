const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.registerUserPage = (req, res) => {
   res.render('registerUser');
};

exports.registerAdminPage = (req, res) => {
   res.render('registerAdmin');
};



exports.registerUser = async (req, res) => {
  try {
    console.log('Received POST request for user registration:', req.body); // Debug log

    // Extract the username and password from the request body
    const { username, password } = req.body;

    // Check if both fields are provided
    if (!username || !password) {
      console.log('Missing username or password'); // Debug log
      return res.status(400).send('Username and password are required');
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('User already exists'); // Debug log
      return res.status(400).send('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully'); // Debug log

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      role: 'user' // default role as user
    });

    // Save the user to the database
    await newUser.save();
    console.log('User registered successfully'); // Debug log

    // Redirect to login after successful registration
    res.redirect('/auth/login');
  } catch (error) {
    console.error('Error during user registration:', error); // Detailed error log
    res.status(500).send('Internal Server Error');
  }
};


exports.registerAdmin = async (req, res) => {
   const { username, password } = req.body;
   try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new User({ username, password: hashedPassword, role: 'admin' });
      await newAdmin.save();
      res.redirect('/auth/login');
   } catch (error) {
      res.status(500).send('Error while registering admin');
   }
};

 exports.loginPage = (req, res) => {
   res.render('login');
};

// Login logic for both user and admin
exports.login = async (req, res) => {
   const { username, password } = req.body;
   try {
      const user = await User.findOne({ username });
      if (!user || !(await bcrypt.compare(password, user.password))) {
         return res.redirect('/auth/login');
      }

      const token = jwt.sign({ id: user._id, role: user.role }, 'yourSecretKey', { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true });

      if (user.role === 'admin') {
         res.redirect('/admin/dashboard');
      } else {
         res.redirect('/user/control');
      }
   } catch (error) {
      res.status(500).send('Error during login');
   }
};
