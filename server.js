const express = require('express');
const cors = require('cors');
const XLSX = require('xlsx');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper to convert Excel serial date to JS date string
function excelDateToJSDate(serial) {
    if (typeof serial === 'number') {
        const utc_days = Math.floor(serial - 25569);
        const utc_value = utc_days * 86400;
        const date_info = new Date(utc_value * 1000);
        // Format as YYYY-MM-DD
        return date_info.toISOString().split('T')[0];
    }
    return serial;
}

// Function to read Excel file
function readExcelFile() {
    try {
        const workbook = XLSX.readFile(path.join(__dirname, 'data', 'interviews.xlsx'));
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        // Fix date formatting for 'day' field
        return data.map(entry => ({
            ...entry,
            day: excelDateToJSDate(entry.day)
        }));
    } catch (error) {
        console.error('Error reading Excel file:', error);
        return [];
    }
}

// API endpoint to get interview schedule by roll number
app.get('/api/interviews/:rollNumber', (req, res) => {
    const { rollNumber } = req.params;
    const data = readExcelFile();
    
    const interviews = data.filter(entry => 
        entry.rollNumber.toString() === rollNumber.toString()
    );

    if (interviews.length === 0) {
        return res.status(404).json({ message: 'No interviews found for this roll number' });
    }

    res.json(interviews);
});

// API endpoint to get all interviews
app.get('/api/interviews', (req, res) => {
    const data = readExcelFile();
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 