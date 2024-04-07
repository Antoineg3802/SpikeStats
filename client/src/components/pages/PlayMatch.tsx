import { useTheme } from "../../context/ThemeContext";
import { css } from "@emotion/css";
import Navbar from "../organisms/Navbar";
import Content from "../organisms/Content";
import SecondaryTitle from "../atoms/titles/SecondaryTitle";
import { Theme } from "../../theme/theme";
import { useEffect } from "react";

export default function PlayMatch() {
	const { theme } = useTheme();
	let currentSet = {

	}

	useEffect(() => {
		
	}, []);

	return (
		<div className={style(theme)}>
			<Navbar />
			<Content>
				<SecondaryTitle text='PlayMatch' />
			</Content>
		</div>
	);
}

const style = (theme: Theme) => css`
	display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    grid-template-areas:
    "navbar content content content content"
    "navbar content content content content"
    "navbar content content content content"
    "navbar content content content content"
    "navbar content content content content";
    overflow: hidden;
    height: 100vh;
    font-family: "Nexa";
    background-color: ${theme.colors.white};
`