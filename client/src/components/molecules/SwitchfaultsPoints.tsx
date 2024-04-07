// DarkModeBtn.tsx
import { css } from "@emotion/css";
import { useTheme } from "../../context/ThemeContext";
import { Theme } from "../../theme/theme";

interface DarkModeBtnProps {
    faults: boolean;
    setFaults: (value: boolean) => void;
}

export default function ({faults,setFaults} : DarkModeBtnProps) {
	const { theme } = useTheme();

	function handleClick(){
        setFaults(!faults)
        console.log(faults)
    }

	return (
        <div className={style.styledContainer()}>
            <label>Voir les fautes ?</label>
            <div className={style.container(theme)} onClick={handleClick}>
                <div className={style.btnIcon(theme, faults)}></div>
            </div>
        </div>
	);
};

const style = {
    styledContainer: ()=>css`
        display: flex;
        position: absolute;
        top: 10px;
        right: 10px;
        gap: 10px;
        justify-content: center;
        align-items: center;
        margin: 10px;
    `,
	container: (theme: Theme)=>css`
		display: block;
		position: relative;
        border: 1px solid ${theme.colors.black};
		width: 50px;
		height: 30px;
		border-radius: 15px;
		background-color: ${theme.colors.white};
		user-select: none;
		&:hover{
			cursor: pointer;
		}
	`,
	btnIcon: (theme: Theme, isFaults: boolean)=>css`
		display: block;
		position: absolute;
		height: 20px;
        width: 20px;
		left: ${isFaults ? '22.5px;' : '2.5px;'};
		top: 2.5px;
		transition: all 0.3s;
		border-radius: 50%;
        background-color: ${theme.colors.black};
		padding: 2.5px;
		&:hover{
			background-color: ${theme.colors.lightOrange};
		}
	`

}