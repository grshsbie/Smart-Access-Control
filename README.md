# Smart Access Control

Smart Access Control is a Progressive Web Application (PWA) designed to manage door access using an ESP32 module. The application provides role-based access control for users and administrators. Administrators can manage users and view activity logs, while users can control the door remotely. This project is built with Node.js and supports deployment across multiple devices, with PWA functionality for offline usage.

## Features

### 1. User Registration and Authentication
- **Separate Registration for Users and Admins**:
  - The system allows both users and administrators to register with unique registration pages. Each role is assigned different permissions.
- **Secure Password Hashing**:
  - User passwords are hashed using `bcryptjs` for secure storage in the database, ensuring data protection.
- **JWT-Based Authentication**:
  - JSON Web Tokens (JWT) are used for secure, token-based authentication. Tokens are stored in cookies and are used to manage sessions without keeping sensitive information on the client side.

### 2. Role-Based Access Control
- **User Role**:
  - Users have access to a control panel where they can open or close the door. They do not have access to admin functions such as viewing logs or managing other users.
- **Admin Role**:
  - Administrators can view activity logs of when and by whom the door was accessed. They also have the ability to manage users and ensure only authorized personnel have access to the door.

### 3. ESP32 Door Control Integration
- **Door Open/Close Functionality**:
  - Users can remotely open and close the door using the application. The app sends requests to an ESP32 module that physically controls the door mechanism.
- **Real-Time Communication**:
  - The app communicates with the ESP32 module using HTTP requests, ensuring instant door control.

### 4. Admin Dashboard
- **View User Logs**:
  - Administrators have access to a dashboard where they can see when users opened and closed the door. The logs are displayed with timestamps and usernames.
- **User Management**:
  - Admins can view all registered users and manage their permissions.

### 5. PWA (Progressive Web Application) Support
- **Offline Access**:
  - Smart Access Control is a PWA, which means it can work offline after the initial load. This is made possible through the service worker, which caches key resources and files for offline usage.
- **Service Worker Integration**:
  - The app uses a service worker to cache assets and API requests, providing a smooth user experience even with limited or no internet connectivity.
- **Installable on Mobile Devices**:
  - Users can install the app directly from the browser onto their mobile devices, allowing easy access similar to a native mobile application.

### 6. Responsive Design
- **Mobile and Desktop Support**:
  - The app is designed to be fully responsive, ensuring a seamless experience across different screen sizes and devices, including mobile phones, tablets, and desktop browsers.
- **Cross-Browser Compatibility**:
  - The app works across all modern browsers, including Edge, ensuring wide compatibility for users on various platforms.

### 7. Secure Logging and User Activity Monitoring
- **Activity Logs**:
  - Every time the door is opened or closed, an entry is recorded in the logs with details such as the user’s name and the time of the action. This provides administrators with insights into access patterns and potential security issues.
- **Error Handling and Alerts**:
  - Users and admins are notified of any errors during registration, login, or door control through real-time alerts and error messages.

### 8. CORS and Preflight Request Handling
- **Cross-Origin Resource Sharing (CORS)**:
  - CORS is enabled in the app to allow cross-origin requests from a different domain, ensuring secure communication between the frontend and backend.
- **Preflight Request Handling**:
  - The app properly handles preflight requests using HTTP `OPTIONS` method to manage CORS policy effectively and prevent cross-origin issues during communication with the ESP32 module.

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/smart-access-control.git
