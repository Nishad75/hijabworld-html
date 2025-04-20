const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();

// MySQL Connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'your_mysql_user',
    password: 'your_mysql_password',
    database: 'portfolio_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Middleware
app.use(cors());
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

        const [result] = await pool.promise().query(
            `INSERT INTO submissions 
            (name, email, phone, purpose, message, file_path, location)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [name, email, phone, purpose, message, filePath, location]
        );

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Endpoint not found' });
  });

  const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your client's URL
  methods: ['POST']
}));