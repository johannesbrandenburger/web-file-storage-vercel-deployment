import DownloadFileButton from "@/components/DownloadFileButton";
import SearchBar from "@/components/SearchBar";
import UploadModal from '@/components/UploadModal';
import accessMongoDB from '@/middleware/accessMongoDB';

// get all documents from mongodb collection
export async function getFiles(search: string = "") {

	let client = await accessMongoDB();
	const db = client?.db('web-file-storage');
	const collection = db?.collection('files');

	// get all files from mongodb collection
	// sorted by creationDate in descending order
	// limit to 10 files

	var find = null;
	if (search.trim().length > 0) {
		find = collection?.find({ $text: { $search: search}});
	} else {
		find = collection?.find({});
	}
	const files = await find?.sort({ creationDate: -1 }).limit(10).toArray();
	console.log(files);
	client?.close();
	return files;
}

export default async function Home({ searchParams }: { searchParams: { search?: string } }) {
	const search: string | undefined = searchParams?.search as string | undefined;
	const files = await getFiles(search);
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<SearchBar search={ search }/>
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