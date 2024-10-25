import express from 'express';
import { addVector, describeIndex } from './pinecone';

interface InsertReq {
    value: string;
}

const app = express();

app.use(express.json());

app.post('/insert', async (req, res) => {
    const data = req.body as InsertReq
    console.log('POST insert', req.body);

    await addVector(data.value);

    res.send('insert data success');
});

app.post('/ask', async (req, res) => {
    console.log(req.body);

    res.json({});
});

app.get('/describe', async (req, res) => {
    res.send(await describeIndex());
});

app.listen(8080, 'localhost', () => {
    console.log('app started');
})