const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3001;

// Task 5.1 APIs
app.get('/viewallrestaurant', (req, res) => {
    res.json({ message: "API Triggered: View All Restaurants" });
});

app.get('/searchrestaurant', (req, res) => {
    res.json({ message: "API Triggered: Search Restaurant" });
});

app.listen(PORT, () => {
    console.log(`Restaurant Service running on port ${PORT}`);
});