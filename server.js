const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/sum', (req, res) => {
    console.log(req.body)
    const numbers = req.body;

    if (!Array.isArray(numbers)) {
        return res.status(400).json({ error: 'Invalid input. Please provide an array of int32 numbers.' });
    }

    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    res.json({ result: sum });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});