import { css } from "@emotion/css";
import { Theme, ThemeContext } from "@emotion/react"
import { useContext } from "react";

const Separation = () => {
    const theme : any = useContext(ThemeContext);
    // const theme = useTheme()
    // console.log(theme)
    // console.log(theme)
    // return <h1 className={style(theme)}>HELLLLOOOO </h1>
    return <hr className={style(theme)} />;
};

const style = (theme: any) => css`
    width: 70%;
    margin: 20px auto;
    /* color: theme.colors.primary; */
`

export default Separation;