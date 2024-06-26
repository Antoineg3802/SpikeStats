export const lightTheme = {
    colors: {
        white: "#fff",
        black: "#000000",
        darkBlue: "#0B2647",
        lightOrange: "#feb272",
        orange: "#ff7f32",
        red: "#dc3545",
        lightRed: "#f8d7da",
        transparent: "rgba(0,0,0,0.5)"
    },
    fontFamily: "Nexa"
} 

export const darkTheme = {
    colors: {
        white: "#313338",
        black: "#fff",
        darkBlue: "#0B2647",
        lightOrange: "#ff7f32",
        orange: "#feb272",
        red: "#dc3545",
        lightRed: "#f8d7da",
        transparent: "rgba(255,255,255,0.5)"
    },
    fontFamily: "Nexa"
}

export interface Theme {
    colors: {
        white: string;
        black: string;
        darkBlue: string;
        lightOrange: string;
        orange: string,
        red: string;
        lightRed: string;
        transparent: string;
    },
    fontFamily: string
}