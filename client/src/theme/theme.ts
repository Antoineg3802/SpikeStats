export const lightTheme = {
    colors: {
        white: "#fff",
        black: "#000000",
        darkBlue: "#0B2647",
        lightOrange: "#feb272",
        orange: "#ff7f32",
        red: "#dc3545",
        lightRed: "#f8d7da",
    },
    fontFamily: "Nexa"
} 

export const darkTheme = {
    colors: {
        white: "#161b22",
        black: "#fff",
        darkBlue: "#0B2647",
        lightOrange: "#feb272",
        orange: "#ff7f32",
        red: "#dc3545",
        lightRed: "#f8d7da",
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
    },
    fontFamily: string
}