const RequestHistory = require('../models/RequestHistory');

// Middleware for logging history
const logRequestHistory = async (req, res, next) => {
  try {
    const { employeeId, requestType, action, status, performedBy } = req.historyDetails;

    const historyEntry = new RequestHistory({
      employeeId,
      requestType,
      action,
      status,
      performedBy,
    });

    await historyEntry.save();
    next();
  } catch (error) {
    console.error('Error logging request history:', error);
    res.status(500).json({ message: 'Error logging request history' });
  }
};

module.exports = logRequestHistory;