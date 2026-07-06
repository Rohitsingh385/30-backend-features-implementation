import { useEffect, useState } from "react";
import type { DiscoverUser } from "../types/user";
import { getUsers, followUser, unfollowUser } from "../api/users";

export default function User(){

    const [users, setUsers] = useState<DiscoverUser>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(()=> {
        const fetchUsers = async()=> {
            try{
                const response = await getUsers()
            }catch{
                setError("failed to fetch users")
            }finally{
                setLoading(false)
            }
        }
        fetchUsers()
    }, [])

    const handleFollowToggle = async(user: DiscoverUser)=> {
        if(user.isFollowing){
            await unfollowUser(user._id)
        }else{
            await followUser(user._id)
        }

        setUsers((currentUsers)=> 
            currentUsers.map((currentUser)=> 
            currentUser._id === user._id) 
        ? {
            ...currentUser,
            isFollowing: !currentUser.isFollowing
        }
        : currentUser
        )
    }
    if(loading){
        return <p>Loading users...</p>
    }
    if(error){
        return <p>{error}</p>
    }
    return (
        <div>
           <h1>Discover Users</h1>
           {users.map((user)=> (
            <div key={user._id}>
                <span>{user.username}</span>
                <button 
                type="button"
                onClick={()=> handleFollowToggle(user)}
                >
                    {user.isFollowing? "Unfollow": "Follow"}
                </button>
            </div>
           ))}
        </div>
    )
}
