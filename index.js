const express = require('express');
const app = express();
const connectDB = require('./db');

// Connect to the database
connectDB();

// Set up middleware and routes
app.use(express.json());
app.use('/api/tournaments', require('./routes/tournaments'));
app.use('/api/participants', require('./routes/participants'));

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
