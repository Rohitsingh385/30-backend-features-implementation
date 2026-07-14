import { useState } from "react"
import api from "../api/axios"

interface Props {
    onUploadSuccess: ()=> void
}
const UploadForm = ({onUploadSuccess}: Props) => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState("")

    const handleUpload = async () => {
        console.log(selectedFile)
        if (!selectedFile) return;

        const formData = new FormData();
       
        formData.append("file", selectedFile)
        
        await api.post("/upload", formData)
        onUploadSuccess()
        alert("Upload Successful")
    }
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files?.[0]

        if (!file) return;

        setPreviewUrl(URL.createObjectURL(file))
        setSelectedFile(file)
    }
    return (
        <div className="space-y-4">
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />

            {selectedFile && (
                <div className="rounded border p-3">
                    <p className="font-medium">
                        {selectedFile.name}
                    </p>
                    <p className="text-sm text-gray-500">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                </div>
            )}
            {previewUrl && (
                <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-64 w-full rounded border object-contain"
                />
            )}

            <button
                onClick={handleUpload}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >   Upload
            </button>
        </div>
    )
}

export default UploadForm