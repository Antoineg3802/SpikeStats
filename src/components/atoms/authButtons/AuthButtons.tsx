"use client"

interface SignInButtonProps {
    signIn: () => void;
    text: string
}

export function SignInButton({ signIn, text}: SignInButtonProps) {
    return (
        <button
            className="block rounded-md bg-lightOrange border-2 border-white height:75px; px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white hover:border-2 hover:text-lightOrange hover:border-lightOrange dark:hover:bg-teal-500"
            onClick={() => signIn()}
        >
            {text}
        </button>
    );
}

interface SignOutButtonProps {
    signOut: () => void;
    text: string
}

export function SignOutButton({ signOut, text }: SignOutButtonProps) {
    return (
        <button
            className="block rounded-md bg-lightOrange px-5 py-2.5 text-sm font-medium text-white transition hover:bg-lightOrange dark:hover:bg-lightOrange"
            onClick={() => signOut()}
        >
            {text}
        </button>
    );
}