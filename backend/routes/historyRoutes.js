const express = require('express');
const router = express.Router();
const RequestHistory = require('../models/RequestHistory');

// Fetch Request History for an Employee
router.get('/:employeeId', async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { date } = req.query;

        let filter = { employeeId };
        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);

            filter.timestamp = { $gte: startOfDay, $lte: endOfDay };
        }

        const history = await RequestHistory.find(filter)
            .sort({ timestamp: -1 })
            .populate('performedBy', 'name')
            .populate('employeeId', 'name');

        if (!history.length) {
            return res.json({ message: 'No history found for this employee.' });
        }

        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
