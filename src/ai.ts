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

export const askContextQuestion = async (question: string, context: any) => {
    return ai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            {role: 'system', content: 'Answer the question only using the context below, and if the question cannot be answered based on the context say, "idk bro"'},
            {role: 'user', content: `Context: ${context}, \n\nQuestion; ${question}`}
        ]
    })
}