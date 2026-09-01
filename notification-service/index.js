const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3004;

// Task 5.4 API
app.post('/sendnotification', (req, res) => {
    const { status, message } = req.body;
    console.log(`Notification sent: ${message}`);
    res.json({ 
        notificationStatus: "DELIVERED", 
        message: `Notification sent for status: ${status}` 
    });
});

app.listen(PORT, () => {
    console.log(`Notification Service running on port ${PORT}`);
});