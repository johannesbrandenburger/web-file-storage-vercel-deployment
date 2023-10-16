import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from "uuid";

// create a new MongoClient
let url = "mongodb://localhost/web-file-storage";
let client = new MongoClient(url);

// main function
async function createDb() {
    try {

        // wait for the connection to establish
        await client.connect();
        console.log("Connected to MongoDB");

        // create a new database
        let db = client.db("web-file-storage");
        
        // create a new collection with a schema
        let collection = db.collection("files");

        // delete all documents in the collection
        let deleteResult = await collection.deleteMany({});
        console.log("Deleted documents:", deleteResult.deletedCount);

        // insert a few documents
        // let insertResult = await collection.insertMany([
        //     {
        //         name: "First Test File",
        //         filename: "Testfile.txt",
        //         fileUuid: uuidv4(),
        //         description: "This is a test file",
        //         tags: ["test", "file"],
        //         creationDate: new Date(),
        //     },
        //     {
        //         name: "Second Test File",
        //         filename: "Testfile.txt",
        //         fileUuid: uuidv4(),
        //         description: "This is another test file",
        //         tags: ["test", "file"],
        //         creationDate: new Date(),
        //     },
        // ]);

        // get all documents in the collection
        let docs = await collection.find().toArray();
        console.log("Found documents:", docs);
    }

    catch (err) {
        console.log(err.stack);
    }

    finally {
        // close the connection
        await client.close();
        console.log("Closed connection to MongoDB");
    }
}

createDb();
