const mongoose = require('mongoose');

const checkInOutSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  requestType: { type: String, enum: ['check-in', 'check-out'], required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected','checked-in', 'checked-out'], default: 'pending' },
  requestBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ApprovedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

module.exports = mongoose.model('CheckInOut', checkInOutSchema);