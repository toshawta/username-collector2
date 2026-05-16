const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = 'data.json';

// Load existing data or initialize
let data = [];
if (fs.existsSync(DATA_FILE)) {
  data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

// Endpoint to get all data
app.get('/api/data', (req, res) => {
  res.json(data);
});

// Endpoint to add new data
app.post('/api/data', (req, res) => {
  const newEntry = {
    id: Date.now(),
    message: req.body.message,
    timestamp: new Date().toISOString(),
  };
  data.push(newEntry);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.json({ success: true, entry: newEntry });
});

// Run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
