const express = require('express');
const connectToMongo=require('./db')
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');
const checkInOutRoutes = require('./routes/checkInOutRoutes');
const approverRoutes = require('./routes/approverRoutes');
const historyRoutes = require('./routes/historyRoutes');
const userRoutes = require('./routes/userRoutes');
const authMiddleware=require('./middleware/authMiddleware')
const dotenv = require('dotenv');

dotenv.config();


connectToMongo();
const app = express();
// Middleware
app.use(cors());
app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/employees',authMiddleware('security'), employeeRoutes);
app.use('/api/checkInOut',authMiddleware('security'),checkInOutRoutes);
app.use('/api/approver',authMiddleware('approver'),approverRoutes);
app.use('/api/history',authMiddleware('security'),historyRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
