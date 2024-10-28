import { QueryResponse, RecordMetadata } from "@pinecone-database/pinecone";

const SCORE_THRESHOLD = .80;

export const toUsableContext = (input: QueryResponse<RecordMetadata>) => {

    if (input.matches.length < 1) {
        return null;
    }

    // take just the entries that are above the threshold
    const values = input.matches
        .map(match => {
            console.log(match.metadata, match.score)
            return match.score! < SCORE_THRESHOLD ? null : match.metadata!['entry'];
        })
        .filter(s => s != null); // get rid of nulls

    // format entries to be a "sentences".
    return values.length > 0 ? values.join('. ').trim() + '.' : null;
}