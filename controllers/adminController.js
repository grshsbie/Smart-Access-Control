const Log = require('../models/log');

// Render the admin dashboard with activity logs
exports.dashboardPage = async (req, res) => {
   try {
      const logs = await Log.find(); // Retrieve all logs
      res.render('admin', { admin: req.admin, logs });
   } catch (error) {
      res.status(500).send('Error while fetching logs');
   }
};

// Log door activity (admin only)
exports.logActivity = async (req, res) => {
   const { username, openTime, closeTime } = req.body;

   try {
      const log = new Log({ username, openTime, closeTime });
      await log.save();
      res.status(201).send('Log saved');
   } catch (error) {
      res.status(500).send('Error while saving log');
   }
};
