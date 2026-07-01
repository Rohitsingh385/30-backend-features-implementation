import { useState } from "react"
import type { RegisterRequest } from "../types/auth"
import { registerUser } from "../api/auth"
import { useNavigate } from "react-router-dom"
import Input from "../components/Input"
export default function Register() {
    const [formData, setFormData] = useState<RegisterRequest>({
        username: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await registerUser(formData)

        navigate("/login")
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow">
                <h1 className="text-3xl font-bold">
                    Register
                </h1>
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <Input
                        label="Username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button className="
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

                        type="submit">Register</button>
                </form>
            </div>
        </div >
    )
}