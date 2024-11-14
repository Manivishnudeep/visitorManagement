const express = require('express');
const router = express.Router();
const CheckInOut = require('../models/CheckInOut');

// Create Check-In/Check-Out Request (Security)
router.post('/', async (req, res) => {
  try {
    const { employeeId, requestType } = req.body;
    const checkInOut = new CheckInOut({
      employeeId,
      requestType,
      status: 'pending',
      requestBy: req.user.id,  // User initiating the request
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
    const requests = await CheckInOut.find({ status: 'pending' }).populate('employeeId requestBy ApprovedBy');
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

    // Update status after approval/rejection
    if (checkInOut.status === 'approved') {
      checkInOut.status = checkInOut.requestType=='check-in'?'checked-in':'checked-out';
      await checkInOut.save();
      res.json(checkInOut);
    } else {
      res.status(400).json({ message: 'Request is not approved' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
