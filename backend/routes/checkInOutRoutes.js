const express = require('express');
const router = express.Router();
const CheckInOut = require('../models/CheckInOut');

// Create Check-In Request (Security)
router.post('/', async (req, res) => {
  try {
    const { employeeId, purposeOfVisit = 'General' } = req.body;
    const checkInOut = new CheckInOut({
      employeeId,
      requestType:"check-in",
      status: 'pending',
      requestBy: req.user.id,
      purposeOfVisit
    });
    await checkInOut.save();
    res.status(201).json(checkInOut);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Pending Check-In/Check-Out Requests for Security
router.get('/pending', async (req, res) => {
  try {
    const requests = await CheckInOut.find({ 
      status: { $in: ['pending', 'rejected'] } // Match status 'pending' or 'rejected'
    }).populate('employeeId requestBy ApprovedBy');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Approved Check-In Requests for Security
router.get('/checkIn', async (req, res) => {
  try {
    const requests = await CheckInOut.find({ 
      status: 'approved',
      requestType:"check-in"
    }).populate('employeeId requestBy ApprovedBy');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get request check-out  requests
router.get('/checkedIn', async (req, res) => {
  try {
    const requests = await CheckInOut.find({ 
      status: 'checked-in',
      requestType:'check-in'
    }).populate('employeeId requestBy ApprovedBy');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get process check-out  requests
router.get('/checkout', async (req, res) => {
  try {
    const requests = await CheckInOut.find({ 
      status: 'approved',
      requestType:'check-out'
    }).populate('employeeId requestBy ApprovedBy');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Process Check-In/Check-Out Request (Security)
router.put('/:id', async (req, res) => {
  try {
    
    const checkInOut = await CheckInOut.findById(req.params.id);
    if (!checkInOut) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Handling the two operations
    // 1. Requesting Check-Out
    if (checkInOut.status === 'checked-in' && checkInOut.requestType === 'check-in') {
      checkInOut.status = 'pending';
      checkInOut.requestType = 'check-out';
    }
    //2. processing check-out
    else if (checkInOut.status === 'approved') {
      checkInOut.status = checkInOut.requestType==='check-out'?'checked-out':'checked-in';
    }
    else {
      return res.status(400).json({ message: 'Invalid operation' });
    }
    await checkInOut.save();
    res.json(checkInOut);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
