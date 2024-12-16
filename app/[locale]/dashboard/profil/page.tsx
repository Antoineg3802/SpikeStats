"use client"

import DashboardPage from "@/components/pages/DashboardPage"
import { useSession } from "next-auth/react"
import { getFullProfil } from "@/actions/users/user.action"
import { useAction } from "next-safe-action/hooks"
import { useEffect, useState } from "react"
import Stripe from "stripe"

export default function Page() {
    const { data: session } = useSession()
    const [isLoading, setIsLoading] = useState(true)
    const [profil, setProfil] = useState<Stripe.Subscription | null>(null)

    useEffect(() => {
        fetch('/api/users/full')
            .then(res => res.json())
            .then(data => {
                setProfil(data)
                setIsLoading(false)
            })
    }, [profil])

    return (
        <DashboardPage session={session} >
            {isLoading ?
                <div className="animate-spin">Loading...</div>
                :
                <div>{profil?.id}</div>
            }
        </DashboardPage>
    )
}