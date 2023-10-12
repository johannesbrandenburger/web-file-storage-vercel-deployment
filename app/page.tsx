import DownloadFileButton from "@/components/DownloadFileButton";
import UploadModal from '@/components/UploadModal';
import accessMongoDB from '@/middleware/accessMongoDB';

// get all documents from mongodb collection
export async function getFiles() {

	let client = await accessMongoDB();
	const db = client?.db('web-file-storage');
	const collection = db?.collection('files');
	const files = await collection?.find({}).toArray();
	console.log(files);
	client?.close();
	return files;
}

export default async function Home() {
	const files = await getFiles()
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			{files?.map((file) => 
				<div key={file.fileUuid} className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
					<div>{file.filename}</div>
					<div>{file.fileUuid}</div>
					<div>{file.description}</div>
					<div>{file.tags.map((tag: string) => 
						<div key={tag}>{tag}</div>
					)}</div>
					<div>{file.creationDate.toString()}</div>
					<DownloadFileButton fileUuid={file.fileUuid} filename={file.filename} />
				</div>
			)}
		<UploadModal />
		</section>
	);
}

const downloadFile = async (fileUuid: string) => {
}