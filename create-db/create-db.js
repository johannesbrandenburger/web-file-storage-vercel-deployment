import { MongoClient } from 'mongodb';

// create a new MongoClient
let url = 'mongodb://localhost/web-file-storage';
let client = new MongoClient(url);

// main function
async function createDb() {
    try {

        // wait for the connection to establish
        await client.connect();
        console.log('Connected to MongoDB');

        // create a new database
        let db = client.db('web-file-storage');
        
        // create a new collection
        let collection = db.collection('files');

        // delete all documents in the collection
        let deleteResult = await collection.deleteMany({});
        console.log('Deleted documents:', deleteResult.deletedCount);

        // insert a few documents
        let insertResult = await collection.insertMany([
            { name: 'file1', content: 'content1' },
            { name: 'file2', content: 'content2' },
            { name: 'file3', content: 'content3' }
        ]);
        
        // get all documents in the collection
        let docs = await collection.find().toArray();
        console.log('Found documents:', docs);
    }

    catch (err) {
        console.log(err.stack);
    }

    finally {
        // close the connection
        await client.close();
        console.log('Closed connection to MongoDB');
    }
}

createDb();
