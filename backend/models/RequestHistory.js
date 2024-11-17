const mongoose = require('mongoose');

const requestHistorySchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  requestType: { type: String, enum: ['check-in', 'check-out'], required: true },
  action: { type: String, enum: ['initiated', 'approved', 'rejected','processed'], required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'checked-in', 'checked-out'], required: true },
  timestamp: { type: Date, default: Date.now },
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('RequestHistory', requestHistorySchema);