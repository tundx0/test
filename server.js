const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json({
    verify: (req, res, buf) => {
        req.rawBody = buf.toString();
    }
}));

app.post('/sum', (req, res) => {
    let numbers;
    try {

        const body = JSON.parse(req.rawBody);
        console.log(body)
        numbers = body.numbers;
    } catch (error) {
       
        numbers = req.body.numbers;
    }

    if (!Array.isArray(numbers) ) {
        return res.status(400).json({ error: 'Invalid input. Please provide an array of integers in the "numbers" field.' });
    }

    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    res.json({ result: sum });
});


app.get('/', (req, res) => {
    res.send('Service is running');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});