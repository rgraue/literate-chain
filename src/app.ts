import express from 'express';
import { addVector, describeIndex, queryDB } from './pinecone';
import { askContextQuestion, createEmbeddings } from './ai';
import util from 'util';
import { toUsableContext } from './utils';

interface ReqShape {
    value: string;
}

const app = express();

app.use(express.json());

app.post('/insert', async (req, res) => {
    console.log('POST insert', req.body);
    const data = req.body as ReqShape

    await addVector(data.value);

    res.send('insert data success');
});

app.post('/ask', async (req, res) => {
    console.log('GET ask', req.body);
    const question = (req.body as ReqShape).value
    const questionEmbeddings = await createEmbeddings(question);

    const closestThree = await queryDB(questionEmbeddings.data.flatMap(d => d.embedding));

    const context = toUsableContext(closestThree);
    
    if (!context) {
        // short circuit if no relevant context
        res.status(404).send('idk bro');
    } else {
        const result = await askContextQuestion(question, context);

        res.status(200).send(result.choices[0].message.content);
    }    
});

app.get('/describe', async (req, res) => {
    res.send(await describeIndex());
});

app.listen(8080, 'localhost', () => {
    console.log('app started');
})