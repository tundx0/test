const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(bodyParser.json({ type: 'application/*+json' }));


app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));


app.use(bodyParser.text({ type: 'text/html' }));


app.use(bodyParser.text({ type: 'text/plain' }));


app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log('--- New Request ---');
    console.log('Time:', new Date().toISOString());
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Query Params:', JSON.stringify(req.query, null, 2));
    console.log('Body (parsed):', JSON.stringify(req.body, null, 2));
    console.log('Body (raw):', req.body instanceof Buffer ? req.body.toString('utf8') : 'Not a Buffer');
    next();
});
app.post('/sum', (req, res) => {
    console.log('Received body:', JSON.stringify(req.body))

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