import { useState } from "react"

const UploadForm = ()=> {

    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState("")
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files?.[0]

        if(!file) return;

        setPreviewUrl(URL.createObjectURL(file))
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
        </div>
    )
}

export default UploadForm