const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Render user registration page
exports.registerUserPage = (req, res) => {
   res.render('registerUser');
};

// Render admin registration page
exports.registerAdminPage = (req, res) => {
   res.render('registerAdmin');
};

// User registration logic
exports.registerUser = async (req, res) => {
   const { username, password } = req.body;
   try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword, role: 'user' });
      await newUser.save();
      res.redirect('/auth/login');
   } catch (error) {
      res.status(500).send('Error while registering user');
   }
};

// Admin registration logic
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

// Render login page
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
