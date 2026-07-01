import { useState, useEffect } from "react"
import type { User } from "../types/auth"
import { getCurrentUser, logoutUser } from "../api/auth"
import { useNavigate } from "react-router-dom"
export default function Dashboard() {

    const [user, setUser] = useState<User | null>(null)
    const navigate = useNavigate()
    useEffect(() => {
        fetchCurrentUser()
    }, [])
    const fetchCurrentUser = async () => {
        const response = await getCurrentUser();

        setUser(response.data.data)
    }

    if (!user) {
        return <h1>Loadin...</h1>
    }
    const handleLogout = async()=> {
        await logoutUser()
        localStorage.removeItem("token")
        navigate("/login")
    }
    return (
        <>

            <h1>Welcome {user.username}</h1>
            <p>{user.email}</p>

            <button onClick={handleLogout}>Logout</button>
        </>

    )
}