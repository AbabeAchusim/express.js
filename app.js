// app.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to verify working hours
const workingHoursMiddleware = (req, res, next) => {
  const date = new Date();
  const day = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hour = date.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // Continue to the next middleware/route handler
  } else {
    res.send('Sorry, the web application is only available during working hours (Monday to Friday, 9am to 5pm).');
  }
};

// Middleware to serve static files (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to use Pug template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Routes
app.get('/', workingHoursMiddleware, (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/services', workingHoursMiddleware, (req, res) => {
  res.render('services', { title: 'Our Services' });
});

app.get('/contact', workingHoursMiddleware, (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
