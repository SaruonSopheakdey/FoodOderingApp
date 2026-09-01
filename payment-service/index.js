const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3003;

// Task 5.3 API
app.post('/paymentprocess', (req, res) => {
    console.log("Processing payment...");
    res.json({ 
        status: "SUCCESS", 
        transactionId: "TXN123456" 
    });
});

app.listen(PORT, () => {
    console.log(`Payment Service running on port ${PORT}`);
});