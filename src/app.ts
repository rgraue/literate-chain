import express from 'express';

const app = express();

app.use(express.json());

app.post('/insert', (req, res) => {
    console.log(req.body);

    res.json({})
});

app.post('/ask', (req, res) => {
    console.log(req.body);

    res.json({});
});

app.listen(8080, 'localhost', () => {
    console.log('app started');
})