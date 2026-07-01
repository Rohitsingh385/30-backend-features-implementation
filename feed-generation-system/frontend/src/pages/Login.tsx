import { useNavigate } from "react-router-dom"
import { useState } from "react"
import type { LoginRequest } from "../types/auth"
import { loginUser } from "../api/auth"
import axios from "axios"
import Input from "../components/Input"
export default function Login() {

    const [formData, setFormData] = useState<LoginRequest>({
        email: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)
        try {
            const response = await loginUser(formData)
            const token = response.data.data.token
            localStorage.setItem("token", token)
            navigate("/dashboard")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data?.message ?? "something went wrong"
                )
            }
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow">
                {error && (
                    <p>{error}</p>
                )}
                <h1 className="text-3xl font-bold">
                    Login
                </h1>
                <p className="mt-2 text-gray-500">
                    Create your account
                </p>
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button
                        className="
                    w-full
                    rounded-md
                    bg-blue-600
                    py-2
                    font-medium
                    text-white
                    hover:bg-blue-700
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    "
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className=" mt-2 text-center text-sm">
                    Already have an account?
                </p>
            </div>

        </div>
    )
}