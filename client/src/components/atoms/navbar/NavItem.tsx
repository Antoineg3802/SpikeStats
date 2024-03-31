import { css } from '@emotion/css';
import { useTheme } from "../../../context/ThemeContext";

interface NavItemProps{
    href: string;
    text: string;
}

const NavItem = ({href, text}: NavItemProps)=>{
    const { theme }= useTheme();
    return (
        <a className={style(theme)} href={href}>{text}</a>
    )
}

const style = (theme: any)=>css`
    color: ${theme.colors.black};
    text-decoration: none;
    margin: 0 10px;
    &:hover{
        color: ${theme.colors.primary};
    }
`

export default NavItem;