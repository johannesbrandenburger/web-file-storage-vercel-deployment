'use server'
import { v4 } from 'uuid'
import accessMongoDB from '@/middleware/accessMongoDB';
import { redirect } from 'next/navigation'
import { BlockBlobClient } from '@azure/storage-blob';
import getStream from 'into-stream';

export default async function upload(data: FormData) {

    const file: File | null = data.get('file') as unknown as File;
    if (!file) {
        return { success: false };
    }
    const filename = file.name;
    const name = data.get('name') as string;
    const description = data.get('description') as string;
    const tagsString = data.get('tags') as string; // comma separated list of tags
    const tags = tagsString.split(',').map((tag) => tag.trim());
    const creationDate = new Date();
    const uuid = v4();

    // save the file in the database
    let client = await accessMongoDB();
    let db = client?.db('web-file-storage');
    const collection = db?.collection('files');
    let insertResponse = await collection?.insertMany([{
        name: name,
        filename: filename,
        fileUuid: uuid,
        description: description,
        tags: tags,
        creationDate: creationDate
    }]);

    console.log("insertResponse", insertResponse);

    // log all the files in the database
    let findResponse = await collection?.find({}).toArray();
    console.log("findResponse", findResponse);

    client?.close();

    // prepare the file for upload
    let fileBuffer = await file.arrayBuffer();
    let stream = getStream(fileBuffer);
    
    // write to azure blob storage
    let containerName = "web-file-storage";
    let blobName = uuid;
    // @ts-ignore
    let blockBlobClient = new BlockBlobClient(process.env.AZURE_STORAGE_CONNECTION_STRING, containerName, blobName);
    let uploadBlobResponse = await blockBlobClient.uploadStream(stream, fileBuffer.byteLength);

    // reload the page to see the new file (wait for 1 second)
    console.log("uploadBlobResponse", uploadBlobResponse);
    redirect('/');
}