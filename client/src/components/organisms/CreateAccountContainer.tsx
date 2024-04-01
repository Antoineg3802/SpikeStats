import { css } from "@emotion/css";
import { useTheme } from "../../context/ThemeContext";
import { Theme } from "../../theme/theme";

interface Props {
    children: React.ReactNode;
    position: string;
};

const CreateAccountContainer = ({children, position} : Props) => {
    const { theme } = useTheme();
    return <div className={style(theme, position)}>{children}</div>;
};

const style = (theme: Theme ,position: string)=>css`
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    padding-left: 20px;
    justify-content: center;

    // Right position (form)
    ${position === 'right' ? 'margin-right: 20px;' : ''}

    // Left position (presentation)
    ${position === 'left' ? 'margin-right: 20px;' : ''}
    ${position === 'left' ? 'background-color: '+ theme.colors.lightOrange +';' : ''}
    ${position === 'left' ? 'border-radius: 0 20px 20px 0;' : ''}
`

export default CreateAccountContainer;