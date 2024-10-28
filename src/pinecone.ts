import { Pinecone } from "@pinecone-database/pinecone";
import { createEmbeddings } from "./ai";

const p = new Pinecone({apiKey: process.env['PINECONE_KEY'] || 'pclocal'});
const index = p.Index('', 'http://localhost:5081');

export const addVector = async (s: string) => {
    const embeddings = await createEmbeddings(s);

    const values = embeddings.data.map(d => {
        return {
            id: embeddings._request_id!,
            values: d.embedding,
            metadata: {entry: s} // too lazy to store in db or other store sorry not sorry
        }
    })

    return await index.namespace('example-namespace').upsert(values);
}

export const queryDB = async (vector: number[]) => {
    return index.namespace('example-namespace').query({
        vector: vector,
        topK: 3,
        includeValues: false,
        includeMetadata: true
    })
}

export const describeIndex = async () => {
    return await index.describeIndexStats();
}

