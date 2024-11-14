const express = require('express');
const router = express.Router();
const CheckInOut = require('../models/CheckInOut');

// Get Check-In/Check-Out History for All Employees on a Specific Date
router.get('/', async (req, res) => {
  const { date } = req.query; // Get the 'date' from query params
  
  // Set the date range to cover the full day (from midnight to the next midnight)
  const start = new Date(date);
  const end = new Date(date);
  end.setDate(end.getDate() + 1);

  try {
    // Fetch check-in/check-out records for all employees within the given date range
    const logs = await CheckInOut.find({
      createdAt: { $gte: start, $lt: end }
    }).populate('employeeId'); // Populate employeeId field with employee details

    // If no logs are found, return a message
    if (logs.length === 0) {
      return res.status(404).json({ message: 'No history found for the given date.' });
    }

    // Send the logs in the response
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
