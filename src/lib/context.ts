import axios from "axios";
import { convertToAscii } from "./utils";
import { getEmbedding } from "./embeddings";

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
    // axios
    //     .request(options)
    //     .then(function (response) {
    //         console.log(response.data);
    //         // return response.data
    //     })
    //     .catch(function (error) {
    //         console.error("Get context Error: ", error);
    //     });
    try {
        const res = await fetch(options.url, {
            method: 'POST',
            headers: options.headers,
            body: JSON.stringify(options.data)
        })
        const data = await res.json()
        console.log(data)
    } catch (error) {
        console.error("Get context Error: ", error);
    }
}

export async function getContext(query: string, file_key:string) {
    const queryEmbeddings = await getEmbedding(query)
    const matchesVectors = await getMatchesFromEmbeddings(queryEmbeddings, file_key)
}