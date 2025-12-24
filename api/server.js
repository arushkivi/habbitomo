const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));
app.use(express.json());

// Routes - Main page redirects to habit tracker
app.get('/', (req, res) => {
  res.redirect('/habit-tracker');
});

app.get('/habit-tracker', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'habit-tracker.html'));
});

app.get('/pomodoro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pomodoro.html'));
});

app.get('/task-manager', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'task-manager.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
