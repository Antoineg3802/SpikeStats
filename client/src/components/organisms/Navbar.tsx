import { css } from "@emotion/css";

import MainTitle from "../atoms/titles/MainTitle";
import { isAuthenticated, deleteAuthCookie } from "../../service/global/verifications";
import DarkModeBtn from "../molecules/DarkModeBtn";
import NavItem from "../atoms/navbar/NavItem";
import NavGroups from "../molecules/NavGroups";
import { useTheme } from "../../context/ThemeContext";
import LogoutBtn from "../atoms/navbar/LogoutBtn";
import { useState } from "react";
import BottomNavGroups from "../molecules/BottomNavGroups";

const Navbar = () => {
    const [isConnected, setIsConnected] = useState(isAuthenticated());
    const {theme} = useTheme();
    let url = window.location.href;
    let slug = url.split("/")[3];

    function handleLogoutBtnClick(){
        setIsConnected(false);
        deleteAuthCookie();
        window.location.href = '/';
    }

    return (
        <div className={style(theme)}>
            <MainTitle text="SpikeStats" />
            <NavGroups>
                <NavItem href="/" text='Home' isSelected={slug === '' ? true : false} />
                <NavItem href="/pricing" text='Pricing' isSelected={slug === 'pricing' ? true : false} />
                <NavItem href="/dashboard" text='Dashboard' isSelected={slug === 'dashboard' ? true : false}/>
            </NavGroups>
            <BottomNavGroups>
                <DarkModeBtn />
                {isConnected ? (
                    <LogoutBtn onClick={handleLogoutBtnClick} text="Se déconnecter"/>
                ) : (
                    <NavItem href="/login" text="Se connecter" isSelected={false} />
                )}
            </BottomNavGroups>
        </div>
    )
}

const style = (theme: any) => css`
    grid-area: navbar;
    background-color: ${theme.colors.lightOrange};
    padding: 10px;
    position: relative;
`

export default Navbar;