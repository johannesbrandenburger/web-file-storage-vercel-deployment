import { BlockBlobClient } from '@azure/storage-blob';

export async function GET(request: Request, { params }: { params: { uuid: string } }) {

  console.log("Download file with uuid", params.uuid);
  if (!params.uuid) {
    return new Response(null, { status: 404 });
  };
  
  let containerName = "web-file-storage";
  let blobName = params.uuid;
  // @ts-ignore
  let blockBlobClient = new BlockBlobClient(process.env.AZURE_STORAGE_CONNECTION_STRING, containerName, blobName);
  let downloadBlockBlobResponse = await blockBlobClient.download(0);
  if (downloadBlockBlobResponse.readableStreamBody != null) {
    let data: any = await streamToBuffer(downloadBlockBlobResponse.readableStreamBody);
    return new Response(data, {
      headers: {
        'Content-Type': 'application/octet-stream',
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
