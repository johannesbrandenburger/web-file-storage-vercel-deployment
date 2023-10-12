'use server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { v4 } from 'uuid'
import accessMongoDB from '@/middleware/accessMongoDB';

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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // write it to the filesystem in the public folder of the project.
    const path = join(process.cwd(), 'public', uuid);
    await writeFile(path, buffer);

    console.log(`open ${path} to see the uploaded file`);

    return { success: true };
}