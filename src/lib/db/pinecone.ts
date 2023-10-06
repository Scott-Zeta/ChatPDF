import { PineconeClient } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

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
export async function processingForPinecone(file_key:string){
    //1. download from s3 and read the pdf
    const file_path = await downloadFromS3(file_key)
    if(!file_path) throw new Error("file not found in S3")
    const loader = new PDFLoader(file_path)
    const pages = loader.load()
    return pages
}