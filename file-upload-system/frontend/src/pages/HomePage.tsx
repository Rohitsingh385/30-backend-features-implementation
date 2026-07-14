import { useEffect, useState } from "react"
import UploadForm from "../components/UploadForm"
import type { FileItem } from "../types/file"
import api from "../api/axios"
const HomePage = () => {

    const [files, setFiles] = useState<FileItem[]>([]);

    const fetchFiles = async () => {
        const response = await api.get("/files");
        setFiles(response.data.data)
    }
    const handleDelete = async(id: string)=> {
        try{
            console.log(id)
            await api.delete(`/files/${id}`)
            fetchFiles()
        }catch(error){
            console.error(error)
            alert("Failed to delete files")
        }
    }
    useEffect(()=> {
        fetchFiles()
    },[])
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="mx-auto max-w-5xl p-8">
                <h1 className="mb-8 text-3xl font-bold">
                    File Upload System
                </h1>

                <div className="rounded-lg border bg-white p-6 shadow-sm">
                    <UploadForm onUploadSuccess={fetchFiles} />
                </div>
                <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
                    Uploaded Files
                </div>
                {files.map((file)=> (
                    <div
                     key={file._id}
                     className="mb-4 flex items-center justify-between rounded border p-4"
                    >
                        <div>
                            <img 
                                src={file.url} 
                                alt={file.originalName}
                                className="mb-2 h-24 w-24 rounded object-cover"
                                />

                            <p className="font-medium">
                                {file.originalName}
                            </p>
                            <p className="text-sm text-gray-500">
                                {(file.size / 1024).toFixed(2)} KB
                            </p>
                        </div>
                    <button 
                        onClick={()=> handleDelete(file._id)}
                        className="rounded bg-red-500 px-3 py-2 text-white hover:bg-red-600"
                    >Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage