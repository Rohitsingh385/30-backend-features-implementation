import UploadForm from "../components/UploadForm"

const HomePage =()=> {
    return(
        <div className="min-h-screen bg-gray-100">
            <div className="mx-auto max-w-5xl p-8">
                <h1 className="mb-8 text-3xl font-bold">
                    File Upload System
                </h1>

                <div className="rounded-lg border bg-white p-6 shadow-sm">
                   <UploadForm />
                </div>
                <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
                    Uploaded Files
                </div>
            </div>
        </div>
    )
}

export default HomePage