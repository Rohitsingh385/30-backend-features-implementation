import { useEffect, useState } from "react";
import type { DiscoverUser } from "../types/user";
import { getUsers, followUser, unfollowUser } from "../api/users";

export default function User() {

    const [users, setUsers] = useState<DiscoverUser[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers()
                setUsers(response.data.data)
            } catch {
                setError("failed to fetch users")
            } finally {
                setLoading(false)
            }
        }
        fetchUsers()
    }, [])

    const handleFollowToggle = async (user: DiscoverUser) => {
        if (user.isFollowing) {
            await unfollowUser(user._id)
        } else {
            await followUser(user._id)
        }

        setUsers((currentUsers) =>
            currentUsers.map((currentUser) =>
                currentUser._id === user._id
                    ? {
                        ...currentUser,
                        isFollowing: !currentUser.isFollowing
                    }
                    : currentUser
            )
        )
    }
    if (loading) {
        return <p>Loading users...</p>
    }
    if (error) {
        return <p>{error}</p>
    }
    return (
        <div className="flex-col bg-gray-200 p-10 h-screen border border-gray p-10 shadow-md ">
            <h1 className="bg-blue-500 text-center p-2">Discover People</h1>
            <div>
                {users.map((user) => (
                    <div className="flex items-center gap-20 m-20 bg-gray-400 p-4 border rounded-xl" key={user._id}>
                        <span>{user.username}</span>
                        <button
                        className="bg-green-300 p-2 rounded-xl hover:bg-green-400"
                            type="button"
                            onClick={() => handleFollowToggle(user)}
                        >
                            {user.isFollowing ? "Unfollow" : "Follow"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
