const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.raw({ type: '*/*' }));

app.post('/sum', (req, res) => {
    let numbers;
  
    console.log('Raw request:', req.body.toString());
    
    try {
        const body = JSON.parse(req.body.toString());
        numbers = body;
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return res.status(400).send('Invalid JSON input');
    }

    if (!Array.isArray(numbers) || !numbers.every(num => Number.isInteger(num))) {
        return res.status(400).send('Invalid input. Please provide an array of integers.');
    }

    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    
    res.setHeader('Content-Type', 'text/plain');
    res.send(sum.toString());
});


app.get('/', (req, res) => {
    res.send('Service is running');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});