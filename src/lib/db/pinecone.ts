import { PineconeClient } from "@pinecone-database/pinecone";

let pinecone: PineconeClient | null = null;

//connect to pinecone db
export const getPineconeClietn = async () => {
    if(!pinecone){
        pinecone = new PineconeClient()
        await pinecone.init({
            environment: process.env.PINECONE_ENVIRONMENT!,
            apiKey: process.env.PINECONE_API_KEY!,
        })
    }
    return pinecone;
}

//data processing
