const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({
    verify: (req, res, buf) => {
        req.rawBody = buf.toString();
    }
}));

app.use((req, res, next) => {
    console.log('--- New Request ---');
    console.log('Time:', new Date().toISOString());
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Query Params:', JSON.stringify(req.query, null, 2));
    console.log('Body Params:', JSON.stringify(req.body, null, 2));
    console.log('Raw Body:', req.rawBody);
    next();
});
app.post('/sum', (req, res) => {
    console.log('Received body:', JSON.parse(req.body))

    let numbers;

    if (Array.isArray(req.body)) {
        numbers = req.body;
    } else if (req.body && Array.isArray(req.body.numbers)) {
        numbers = req.body.numbers;
    } else {
        console.error('Invalid input structure');
        return res.status(400).send('Invalid input structure. Expected an array of integers or an object with a "numbers" array.');
    }

    if (!numbers.every(num => Number.isInteger(num))) {
        console.error('Non-integer values found');
        return res.status(400).send('Invalid input. All elements must be integers.');
    }

    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    
    console.log('Calculated sum:', sum);
    

    res.setHeader('Content-Type', 'text/plain');
    res.send(sum.toString());
});


app.get('/', (req, res) => {
    res.send('Service is running');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});