import { Pinecone, PineconeRecord } from '@pinecone-database/pinecone';
import { downloadFromS3 } from './s3-server';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import {
  RecursiveCharacterTextSplitter,
  Document,
} from '@pinecone-database/doc-splitter';
import { getEmbedding } from './embeddings';
import md5 from 'md5';
import axios from 'axios';
import { convertToAscii } from './utils';

//connect to pinecone db
export const getPineconeClient = async () => {
  return new Pinecone({
    environment: process.env.PINECONE_ENVIRONMENT!,
    apiKey: process.env.PINECONE_API_KEY!,
  });
};

//data processing

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export async function processingForPinecone(file_key: string) {
  //1. download from s3 and read the pdf
  const file_path = await downloadFromS3(file_key);
  if (!file_path) throw new Error('file not found in S3');
  const loader = new PDFLoader(file_path);
  const pages = (await loader.load()) as PDFPage[];

  //2. parse the pdf string
  //considering to convert into single page to prevent paragraph cross multiple pages.
  const paragraphs = await Promise.all(pages.map(parseDocument));

  //3. convert paragraphs into vector pinecon accpetable by openai model
  const vectors = await Promise.all(paragraphs.flat().map(embeddingParagraph));

  //4. Since the bug confirmed in Pinecone SDK, use axios do api call
  const options = {
    method: 'POST',
    url: `${process.env.PINECONE_HOST}/vectors/upsert`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'Api-Key': `${process.env.PINECONE_API_KEY}`,
    },
    data: {
      vectors: vectors,
      namespace: convertToAscii(file_key),
    },
  };
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error('Upload to pinecone error: ', error);
    });

  return vectors;
}

// export const truncateStringByBytes = (str:string, bytes:number) => {
//     const enc = new TextEncoder()
//     return new TextDecoder('utf-8').decode(enc.encode(str).slice(0, bytes))
// }

//parse the pdf string
async function parseDocument(page: PDFPage) {
  let { pageContent, metadata } = page;
  pageContent = pageContent.replace(/\n/g, ' ');
  //define splitter for content
  const splitter = new RecursiveCharacterTextSplitter();
  const paragraph = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        ...metadata,
        pageNumber: metadata.loc.pageNumber,
        // text: truncateStringByBytes(pageContent, 3600)
      },
    }),
  ]);
  return paragraph;
}

//embedding the paragraph
async function embeddingParagraph(paragraph: Document) {
  try {
    const embeddings = await getEmbedding(paragraph.pageContent);
    const hash = md5(paragraph.pageContent);
    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: paragraph.pageContent,
      },
    } as PineconeRecord;
  } catch (error) {
    console.error('embedding error: ', error);
    throw error;
  }
}
