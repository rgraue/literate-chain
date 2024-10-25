import { Pinecone } from "@pinecone-database/pinecone";
import { createEmbeddings } from "./ai";

const p = new Pinecone({apiKey: process.env['PINECONE_KEY'] || 'pclocal'});

const index = p.Index('', 'http://localhost:5081');

export const addVector = async (s: string) => {
    console.log(`adding ${s} to pinecone`);
    const embeddings = await createEmbeddings(s);

    console.log(`embeddings made for: ${embeddings.data}`);
    const values = embeddings.data.map(d => {
        return {
            id: embeddings._request_id!,
            values: d.embedding,
            metadata: {}
        }
    })

    return await index.namespace('example-namespace').upsert(values);
}

export const describeIndex = async () => {
    return await index.describeIndexStats();
}

