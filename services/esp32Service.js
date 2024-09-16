const fetch = require('node-fetch');

// Function to send a request to the ESP32 to open the door
exports.openDoor = async () => {
   try {
      const response = await fetch('http://esp32_ip_address/open', { method: 'POST' });
      return response.ok;
   } catch (error) {
      console.error('Error opening door:', error);
      return false;
   }
};

// Function to send a request to the ESP32 to close the door
exports.closeDoor = async () => {
   try {
      const response = await fetch('http://esp32_ip_address/close', { method: 'POST' });
      return response.ok;
   } catch (error) {
      console.error('Error closing door:', error);
      return false;
   }
};
