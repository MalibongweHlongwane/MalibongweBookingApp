A feature-rich booking web application inspired by Booking.com and Airbnb, built with vanilla JavaScript, HTML, and CSS. This app allows users to search for properties, make bookings, manage their reservations, and provides partners with a comprehensive dashboard to manage listings, pricing, and analytics. All data is persisted using localStorage, making it a fully functional front-end application without a backend dependency.

Features
User Features
Authentication: Sign up and sign in with email/password; option to register as a partner.
Real-Time Search: Search properties by location with instant results, filters (price, free cancellation), and sorting (price, rating).
Property Details: View detailed property info including description, amenities, and reviews in a modal.
Booking System: Book properties with payment simulation, including saved card options and email receipt (console-logged).
Booking Management: View all bookings (active and cancelled) with options to cancel or message hosts.
Profile: Displays user info, total bookings, and saved payment methods.
Partner Dashboard (Extranet)
Manage Listings: Add new properties with photos, set prices, and track performance (views, bookings).
Calendar & Availability: Update property availability, set min/max stay durations, and simulate syncing with Airbnb.
Pricing Tools: Adjust base prices, add promotions (e.g., discounts), and view dynamic pricing suggestions.
Guest Communication: Send automated welcome messages and direct messages to guests, with a message history.
Analytics & Reports: View booking trends, revenue stats, and average ratings in a table format.
Technical Features
LocalStorage: Persists users, bookings, messages, and cards per user.
Responsive Design: Clean, modern UI inspired by Booking.com and Airbnb, using CSS with a mobile-friendly layout.
Modular Code: Organized JavaScript with a Storage class and reusable functions.
Real-Time Features: Debounced search input for performance optimization.

Project Structure
anitas-brand/
├── index.html       # Main HTML file
├── styles.css       # CSS styling
├── script.js        # JavaScript logic
└── README.md        # This file

Technologies Used
HTML5: Structure and markup.
CSS3: Styling with a Booking.com/Airbnb-inspired design.
JavaScript (ES6): Core logic, DOM manipulation, and localStorage management.
Google Fonts: Roboto font for modern typography.

Limitations

No backend server; all data is stored in localStorage.
Simulated email sending (console logs only).
No real API integration or external calendar syncing.
Basic security (no input sanitization or encryption).
Future Enhancements
Integrate a Node.js backend with MongoDB for persistent data.
Add real email functionality using a service like Nodemailer.
Implement React for a component-based architecture.
Add unit tests with Jest.
Enhance security with input validation and JWT authentication.
