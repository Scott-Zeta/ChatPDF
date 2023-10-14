import axios from "axios";
import { convertToAscii } from "./utils";

export async function getMatchesFromEmbeddings(embeddings: number[], file_key:string) {
    const namespace = convertToAscii(file_key)
    const options = {
        method: 'POST',
        url: `${process.env.PINECONE_HOST}/query`,
        headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'Api-Key': '***REMOVED***'
        },
        data: {
            includeValues: false,
            includeMetadata: true,
            namespace: namespace,
            topK: 8,
        vector: embeddings,
        }
    };
    axios
        .request(options)
        .then(function (response) {
        console.log(response.data);
        })
        .catch(function (error) {
        console.error("Get context Error: ", error);
        });
}

export async function getContext(query: string, file_key:string) {
    
}