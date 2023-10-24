import { BlockBlobClient } from '@azure/storage-blob';

export async function GET(request: Request) {

  console.log(process.env.AZURE_STORAGE_CONNECTION_STRING);
  let containerName = "web-file-storage";
  let blobName = "Johannes.jpg"
  // @ts-ignore
  let blockBlobClient = new BlockBlobClient(process.env.AZURE_STORAGE_CONNECTION_STRING, containerName, blobName);

  let downloadBlockBlobResponse = await blockBlobClient.download(0);

  if (downloadBlockBlobResponse.readableStreamBody != null) {
    let data: any = await streamToBuffer(downloadBlockBlobResponse.readableStreamBody);
    return new Response(data, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment; filename=' + "Johannes.jpg"
      },
    });
  }
  return new Response(null, { status: 404 });
}

async function streamToBuffer(readableStream: NodeJS.ReadableStream) {
  return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      readableStream.on('data', (data: Buffer) => {
          chunks.push(data);
      });
      readableStream.on('end', () => {
          resolve(Buffer.concat(chunks));
      });
      readableStream.on('error', reject);
  });
}
