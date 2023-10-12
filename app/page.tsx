import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { MongoClient } from 'mongodb';

// get all documents from mongodb collection
export async function getData() {

	// create a new MongoClient
	let url = 'mongodb://localhost/web-file-storage';
	let client = new MongoClient(url);

	try {

        // wait for the connection to establish
        await client.connect();
        console.log('Connected to MongoDB');

        // create a new database
        let db = client.db('web-file-storage');
        
        // create a new collection
        let collection = db.collection('files');

        // get all documents in the collection
        let docs = await collection.find().toArray();
        console.log('Found documents:', docs);
		console.log(docs[0].name);
		return docs.reduce((acc, cur) => acc + cur.name + " ", "");
    }

    catch (err: any) {
        console.log(err.stack);
    }

    finally {
        // close the connection
        await client.close();
        console.log('Closed connection to MongoDB');
    }

}

export default async function Home() {
	const data = await getData()

	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Make&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
				<br />
				<h1 className={title()}>
					websites regardless of your design experience.
				</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					Beautiful, fast and modern React UI library.
				</h2>
			</div>

			<div className="flex gap-3">
				<Link
					isExternal
					as={NextLink}
					href={siteConfig.links.docs}
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
				>
					Documentation
				</Link>
				<Link
					isExternal
					as={NextLink}
					className={buttonStyles({ variant: "bordered", radius: "full" })}
					href={siteConfig.links.github}
				>
					<GithubIcon size={20} />
					GitHub
				</Link>
			</div>

			<div className="mt-8">
				<Snippet hideSymbol hideCopyButton variant="flat">
					<span>
						Get started by editing <Code color="primary">app/page.tsx</Code>
					</span>
				</Snippet>
			</div>

			{data}
		</section>
	);
}
