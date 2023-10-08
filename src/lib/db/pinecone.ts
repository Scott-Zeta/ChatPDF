import { PineconeClient } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter, Document } from "@pinecone-database/doc-splitter";
import { parse } from "path";

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

type PDFPage = {
    pageContent: string;
    metadata:{
        loc:{pageNumber:number};
    }
}

export async function processingForPinecone(file_key:string){
    //1. download from s3 and read the pdf
    const file_path = await downloadFromS3(file_key)
    if(!file_path) throw new Error("file not found in S3")
    const loader = new PDFLoader(file_path)
    const pages = (await loader.load()) as PDFPage[]
    //2. parse the pdf string
    const paragraphs = await Promise.all(pages.map(parseDocumnet))
    return paragraphs
}

// export const truncateStringByBytes = (str:string, bytes:number) => {
//     const enc = new TextEncoder()
//     return new TextDecoder('utf-8').decode(enc.encode(str).slice(0, bytes))
// }

//parse the pdf string
async function parseDocumnet(page: PDFPage){
    let {pageContent, metadata} = page
    pageContent = pageContent.replace(/\n/g, "")
    //define splitter for content
    const splitter = new RecursiveCharacterTextSplitter()
    const paragraph = await splitter.splitDocuments([
        new Document({
            pageContent,
            metadata:{
                ...metadata,
                pageNumber: metadata.loc.pageNumber,
                // text: truncateStringByBytes(pageContent, 3600)
            }
        })
    ])
    return paragraph
}