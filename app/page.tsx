import DownloadFileButton from "@/components/DownloadFileButton";
import FileTable from "@/components/FileTable";
import SearchBar from "@/components/SearchBar";
import UploadModal from '@/components/UploadModal';
import { title } from "@/components/primitives";
import accessMongoDB from '@/middleware/accessMongoDB';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/table";

// get all documents from mongodb collection
async function getFiles(search: string = "") {

	let client = await accessMongoDB();
	const db = client?.db('web-file-storage');
	const collection = db?.collection('files');

	// get all files from mongodb collection
	// sorted by creationDate in descending order
	// limit to 10 files

	var find = null;
	if (search.trim().length > 0) {
		find = collection?.find({ $or: [{ "name": { $regex: search } }, { "tags": { $regex: search } }, { "description": { $regex: search } }] });
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
	const files = await getFiles(search) || [] as any[];
	files.forEach(file => delete file._id);

	return (
		<section className="flex flex-col items-center justify-center gap-3 py-5 md:py-2">
			<h1 className={title({ color: "yellow", size: "sm"})}>Web File Storage</h1>
			<div className="flex flex-row items-center justify-center gap-2" style={{ width: "100%" }}>
				<SearchBar search={search} />
				<UploadModal />
			</div>
			<FileTable files={files}></FileTable>
		</section>
	);
}