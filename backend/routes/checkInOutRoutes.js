const express = require('express');
const router = express.Router();
const CheckInOut = require('../models/CheckInOut');
const logRequestHistory = require('../middleware/logHistoryMiddleware');

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

// Get checked-in  requests
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

// Create Check-In Request (Security)
router.post('/', async (req, res, next) => {
  try {
    const { employeeId, purposeOfVisit = 'General' } = req.body;

    const checkInOut = new CheckInOut({
      employeeId,
      requestType: 'check-in',
      status: 'pending',
      requestBy: req.user.id,
      purposeOfVisit,
    });

    await checkInOut.save();
    
    req.historyDetails = {
      employeeId,
      requestType: 'check-in',
      action: 'initiated',
      status: 'pending',
      performedBy: req.user.id,
    };

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}, logRequestHistory, (req, res) => {
  res.status(201).json(req.historyDetails);
});

// Process Check-In/Check-Out Request (Security)
router.put('/:id', async (req, res, next) => {
  try {
    const checkInOut = await CheckInOut.findById(req.params.id);
    if (!checkInOut) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (checkInOut.status === 'checked-in' && checkInOut.requestType === 'check-in') {
      checkInOut.status = 'pending';
      checkInOut.requestType = 'check-out';

      req.historyDetails = {
        employeeId: checkInOut.employeeId,
        requestType: 'check-out',
        action: 'initiated',
        status: 'pending',
        performedBy: req.user.id,
      };
    } else if (checkInOut.status === 'approved') {
      checkInOut.status =
        checkInOut.requestType === 'check-out' ? 'checked-out' : 'checked-in';

      req.historyDetails = {
        employeeId: checkInOut.employeeId,
        requestType: checkInOut.requestType,
        action: 'processed',
        status: checkInOut.status,
        performedBy: req.user.id,
      };
    } else {
      return res.status(400).json({ message: 'Invalid operation' });
    }

    await checkInOut.save();
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}, logRequestHistory, (req, res) => {
  res.json(req.historyDetails);
});

module.exports = router;
