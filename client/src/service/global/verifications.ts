export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isAuthenticated(): boolean {
    return document.cookie.split('; ').find(row => row.startsWith('isAuthenticated'))?.split('=')[1] ? true : false;
}

export function isDarkMode(): boolean {
    return document.cookie.split('; ').find(row => row.startsWith('theme'))?.split('=')[1] === 'dark' ? true : false;
}

export function setDarkModeCookie(isDarkMode: boolean): void {
    console.log(isDarkMode)
    if(isDarkMode){
        document.cookie = 'theme=dark';
    }else{
        document.cookie = 'theme=light';
    }
}