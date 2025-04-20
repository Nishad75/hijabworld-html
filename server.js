const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

app.use(express.static('public'));

// Route to serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// MySQL Connection
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['POST']
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// File upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Form submission endpoint
app.post('/submit-form', upload.single('file'), async (req, res) => {
    try {
        const { name, email, phone, purpose, message, location } = req.body;
        const filePath = req.file ? req.file.path : null;

        console.log('Form Data:', {
            name,
            email,
            phone,
            purpose,
            message,
            filePath,
            location
        });

        // const [result] = await pool.promise().query(
        //     `INSERT INTO submissions 
        //     (name, email, phone, purpose, message, file_path, location)
        //     VALUES (?, ?, ?, ?, ?, ?, ?)`,
        //     [name, email, phone, purpose, message, filePath, location]
        // );

        res.status(200).json({
            success: true,
            message: 'Form submitted successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Error submitting form'
        });
    }
});

// 404 Handler (must be last)
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
