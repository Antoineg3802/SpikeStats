"use client"

interface SignInButtonProps {
    signIn: () => void;
    text: string
}

export function SignInButton({ signIn, text}: SignInButtonProps) {
    return (
        <button
            className="block rounded-md bg-primary text-background border-2 height:75px; px-5 py-2.5 text-sm font-medium transition hover:cursor-pointer hover:bg-background hover:border-2 hover:text-primary hover:border-primary"
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
            className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-primary"
            onClick={() => signOut()}
        >
            {text}
        </button>
    );
}