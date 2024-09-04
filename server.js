const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/sum', (req, res) => {
    console.log(req.body)
    const numbers = req.body;



    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    res.json({ result: sum });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});