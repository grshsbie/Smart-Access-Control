const esp32Service = require('../services/esp32Service');

// Render the control page for users
exports.controlPage = (req, res) => {
   res.render('user', { user: req.user });
};

// Logic for opening the door
exports.openDoor = async (req, res) => {
   try {
      const result = await esp32Service.openDoor();
      if (result) {
         res.status(200).send('Door opened');
      } else {
         res.status(500).send('Failed to open door');
      }
   } catch (error) {
      res.status(500).send('Error while opening the door');
   }
};

// Logic for closing the door
exports.closeDoor = async (req, res) => {
   try {
      const result = await esp32Service.closeDoor();
      if (result) {
         res.status(200).send('Door closed');
      } else {
         res.status(500).send('Failed to close door');
      }
   } catch (error) {
      res.status(500).send('Error while closing the door');
   }
};
