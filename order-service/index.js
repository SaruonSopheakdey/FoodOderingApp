const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const PORT = 3002;

// Task 5.2 APIs
app.get('/vieworder', (req, res) => {
    res.json({ message: "API Triggered: View Order" });
});

app.delete('/cancelorder', (req, res) => {
    res.json({ message: "API Triggered: Cancel Order" });
});

// Inter-service flow: Order -> Payment -> Order -> Notification -> User
app.post('/addorder', async (req, res) => {
    try {
        // Step 1: Call Payment API
        const paymentResponse = await axios.post('http://localhost:3003/paymentprocess', req.body);
        const paymentResult = paymentResponse.data;

        // Step 2: Determine Notification payload based on payment outcome
        let notificationPayload = {};
        if (paymentResult.status === "SUCCESS") {
            notificationPayload = {
                status: "SUCCESS",
                message: "Your payment was successful and your order is confirmed!"
            };
        } else {
            notificationPayload = {
                status: "FAILURE",
                message: "Payment failed. Order was not placed."
            };
        }

        // Step 3: Call Notification API
        const notificationResponse = await axios.post('http://localhost:3004/sendnotification', notificationPayload);

        // Step 4: Return combined result to User
        res.json({
            orderStatus: "COMPLETED",
            paymentDetails: paymentResult,
            notificationDetails: notificationResponse.data
        });

    } catch (error) {
        res.status(500).json({ error: "Inter-service communication failed", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Order Service running on port ${PORT}`);
});