import { QueryResponse, RecordMetadata } from "@pinecone-database/pinecone";

const SCORE_THRESHOLD = .80;

export const toUsableContext = (input: QueryResponse<RecordMetadata>) => {

    if (input.matches.length < 1) {
        return null;
    }

    const values = input.matches
        .map(match => {
            console.log(match.metadata, match.score)
            return match.score! < SCORE_THRESHOLD ? null : match.metadata!['entry'];
        })
        .filter(s => s != null);

    

    return values.length > 0 ? values.join('. ').trim() + '.' : null;
}