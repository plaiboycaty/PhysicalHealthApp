const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Dùng để parse JSON body
app.use(express.urlencoded({ extended: true }));

// Định tuyến cơ bản (Test)
app.get('/', (req, res) => {
    res.json({ message: 'Chào mừng đến với Backend API của Ứng dụng Sức Khỏe Tâm Lý' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
