const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.raw({ type: '*/*' }));

app.post('/sum', (req, res) => {
    console.log('Received body:', req.body);

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