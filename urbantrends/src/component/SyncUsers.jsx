import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios';
import React, { useEffect } from 'react'

function SyncUsers() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const backendLink = import.meta.env.VITE_MAIN_LINK;

    useEffect(() => {
        const syncData = async () => {
            try {
                const payload = {
                    auth0_id: user.sub,
                    name: user.name || `${user.given_name} ${user.family_name}` || "Unnamed User",
                    email: user.email,
                    avatar: user.picture,
                    role: "client", // change this later
                };
                await axios.post(`${backendLink}/users/sync`, payload);
                console.log("data synced succesfully", payload);
            } catch (error) {
                console.error("error syncing data", error?.message || error.message)
            }
        }

        syncData();
    }, [isAuthenticated, user])

    if (isLoading) return <p> Loading... </p>
    return null;
}

export default SyncUsers