"use server"
import { MongoClient } from 'mongodb';

export default async function accessMongoDB() {

    // create a new MongoClient
	let url = 'mongodb://localhost/web-file-storage';
	let client = new MongoClient(url);

	try {

        // wait for the connection to establish
        await client.connect();
        console.log('Connected to MongoDB');

        return client as MongoClient;
    }

    catch (err: any) {
        return null;
    }

}