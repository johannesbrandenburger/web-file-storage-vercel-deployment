'use server'
import { writeFile } from 'fs/promises'
import { join } from 'path'


export default async function upload(data: FormData) {

    const file: File | null = data.get('file') as unknown as File
    if (!file) {
        throw new Error('No file uploaded')
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // write it to the filesystem in the public folder of the project.
    const path = join(process.cwd(), 'public', file.name)
    await writeFile(path, buffer)

    console.log(`open ${path} to see the uploaded file`)

    return { success: true }
}