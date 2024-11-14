"use client"

import { getCurrentUser } from "@/lib/auth/auth"
import { useSession } from "next-auth/react"

export default function Page() {
    const { data: session } = useSession()

    if (session?.user && session.user.id) {
        const { user } = session

        return (
            <div>
                <h1>{user.name}</h1>
                <p>{user.email}</p>
                {user.image && <img height="300" width="300" src={user.image} alt="Profil picture" />}
            </div>
        )
    }
}