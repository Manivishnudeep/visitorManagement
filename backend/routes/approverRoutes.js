const express = require('express');
const router = express.Router();
const CheckInOut = require('../models/CheckInOut');
const logRequestHistory = require('../middleware/logHistoryMiddleware');

// Get Check-In Requests for Approver
router.get('/check-in', async (req, res) => {
  try {
    const requests = await CheckInOut.find({ requestType: 'check-in', status: 'pending' }).populate('employeeId requestBy ApprovedBy');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Check-Out Requests for Approver
router.get('/check-out', async (req, res) => {
  try {
    const requests = await CheckInOut.find({ requestType: 'check-out', status: 'pending' }).populate('employeeId requestBy ApprovedBy');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve or Reject Check-In/Check-Out Request
router.put('/:id', async (req, res, next) => {
  try {
    const { status } = req.body;
    const checkInOut = await CheckInOut.findById(req.params.id);

    if (!checkInOut) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    checkInOut.status = status;
    checkInOut.ApprovedBy = req.user.id;
    await checkInOut.save();

    req.historyDetails = {
      employeeId: checkInOut.employeeId,
      requestType: checkInOut.requestType,
      action: status === 'approved' ? 'approved' : 'rejected',
      status,
      performedBy: req.user.id,
    };

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}, logRequestHistory, (req, res) => {
  res.json(req.historyDetails);
});

module.exports = router;
