import { useNavigate } from "react-router-dom"
import { useState } from "react"
import type { LoginRequest } from "../types/auth"
import { loginUser } from "../api/auth"
import axios from "axios"
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
        <>
            {error && (
                <p>{error}</p>
            )}
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        value={formData.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        value={formData.password}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </form>
        </>
    )
}