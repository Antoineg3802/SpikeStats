export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isAuthenticated(): boolean {
    return document.cookie.split('; ').find(row => row.startsWith('isAuthenticated'))?.split('=')[1] ? true : false;
}