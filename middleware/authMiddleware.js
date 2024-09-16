const jwt = require('jsonwebtoken');

// Middleware to verify that the user is authenticated and is a user
exports.isUser = (req, res, next) => {
   const token = req.cookies.token;
   if (!token) {
      return res.redirect('/auth/login');
   }

   jwt.verify(token, 'yourSecretKey', (err, decoded) => {
      if (err || decoded.role !== 'user') {
         return res.redirect('/auth/login');
      }
      req.user = decoded; // Store the user details in the request object
      next();
   });
};

// Middleware to verify that the user is authenticated and is an admin
exports.isAdmin = (req, res, next) => {
   const token = req.cookies.token;
   if (!token) {
      return res.redirect('/auth/login');
   }

   jwt.verify(token, 'yourSecretKey', (err, decoded) => {
      if (err || decoded.role !== 'admin') {
         return res.redirect('/auth/login');
      }
      req.admin = decoded; // Store the admin details in the request object
      next();
   });
};
