import { useState } from "react"
import type { RegisterRequest } from "../types/auth"
import { registerUser } from "../api/auth"
import { useNavigate } from "react-router-dom"

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
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await registerUser(formData)
        navigate("/login")
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="Username">Username</label>
                <input
                 type="text"
                 onChange={handleChange} 
                 name="username"
                 id="username"
                 value={formData.username} 
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input 
                 type="email" 
                 onChange={handleChange} 
                 value={formData.email}
                 name="email"
                 id="email"
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input 
                 type="password" 
                 onChange={handleChange}
                 value={formData.password} 
                 name="password" 
                 id="password"
                />
            </div>
            <button type="submit">Register</button>
        </form>
    )
}