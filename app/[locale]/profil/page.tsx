"use client"

import { useServerAction } from "zsa-react"
import { getUsers } from "@/actions/users.action"
import { IconLoader2 } from "@tabler/icons-react"
import { useEffect, useRef } from "react"

export default function Page() {
    const { isPending, isSuccess, isError, execute, data, error } = useServerAction(getUsers)
    const users = data || []
    const hasFetchedData = useRef(false);

    useEffect(() => {
        if (!hasFetchedData.current && !isPending && !isSuccess) {
            execute();
            hasFetchedData.current = true; // Marque que la requête a été effectuée
        }
    }, [isPending, isSuccess]);

    return <div>
        {isPending && <IconLoader2 className="animate-spin" />}
        {isSuccess && users.length === 0 && <p>No users found</p>}
        {isSuccess && users.length > 0 && 
            users.map((user) => {
                return <p key={user.id}>{user.email}</p>
            })
        }
        {isError && <p>{error.message}</p>}
    </div>
}