import OpenAI from "openai";

const ai = new OpenAI({
    apiKey: process.env['OPENAI_KEY']
});

export const createEmbeddings = async (s: string) => {
    const fixed = s.trim();

    console.log(`creating embeddings for: "${s}"`);
    return ai.embeddings.create({
        input: fixed,
        model: 'text-embedding-ada-002'
    })
}