import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import fs from 'fs';

export async function GET(request: Request) {

  console.log(process.env.AZURE_STORAGE_CONNECTION_STRING);
  let containerName = "web-file-storage";
  let blobName = "Johannes.jpg"
  let blockBlobClient = new BlockBlobClient(process.env.AZURE_STORAGE_CONNECTION_STRING, containerName, blobName);

  let downloadBlockBlobResponse = await blockBlobClient.download(0);

  let ws = fs.createWriteStream("Johannes.jpg");
  if (downloadBlockBlobResponse.readableStreamBody) {
    await downloadBlockBlobResponse.readableStreamBody.pipe(ws);
    console.log("Downloaded blob content to file");
  }  

  return new Response('Hello world!') 
}