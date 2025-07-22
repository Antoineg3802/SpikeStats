'use client'

import { useSession } from "next-auth/react"
import { signIn, signOut } from "next-auth/react"
import { SignInButton } from "../atoms/authButtons/AuthButtons"
import { DropdownMenu } from "../molecules/DropdownMenu"
import ProfilMenus from "@/datas/ProfilMenus"
import { useI18n } from "../../../locales/client"

export function NavbarSessionPart() {
    const { data: session } = useSession()
    const t = useI18n()

    if (session?.user) {
        return (
            <DropdownMenu
                personalMenus={ProfilMenus.personalMenus}
                signOut={signOut}
                image={session.user.image ?? "/img/defaultProfilePicture.png"}
            />
        )
    }

    return <SignInButton signIn={signIn} text={t("auth.signIn")} />
}
