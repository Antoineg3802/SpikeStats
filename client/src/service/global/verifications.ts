export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isAuthenticated(): boolean {
    let isAuthenticatedCookie = document.cookie.split('; ').find(row => row.startsWith('isAuthenticated'))?.split('=')[1]
    if (isAuthenticatedCookie === "true") {
        return true;
    }
    return false;
}

export function deleteAuthCookie(): void {
    console.log('deleteAuthCookie')
    document.cookie = 'isAuthenticated=false';
}

export function isDarkMode(): boolean {
    return document.cookie.split('; ').find(row => row.startsWith('theme'))?.split('=')[1] === 'dark' ? true : false;
}

export function setDarkModeCookie(isDarkMode: boolean): void {
    if(isDarkMode){
        document.cookie = 'theme=dark';
    }else{
        document.cookie = 'theme=light';
    }
}