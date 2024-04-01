import { css } from '@emotion/css';
import { useTheme } from "../../../context/ThemeContext";

interface NavItemProps{
    href: string;
    text: string;
    isSelected?: boolean;
}

const NavItem = ({href, text, isSelected}: NavItemProps)=>{
    const { theme }= useTheme();
    return (
        <a className={style(theme, isSelected)} href={href}>{text}</a>
    )
}

const style = (theme: any, isSelected?: boolean)=>css`
    color: ${theme.colors.white};
    text-decoration: none;
    margin: 0 10px;
    padding: 5px;
    transition: all 0.2s;
    border: 1px solid ${theme.colors.lightOrange};
    border-radius: 5px;

    ${isSelected && `border-color: ${theme.colors.white};`}
    &:hover{
        color: ${theme.colors.white};
        border-color: ${theme.colors.white};
    }
`

export default NavItem;