import { css } from '@emotion/css';
import { Theme } from '../../theme/theme';
import { useTheme } from '../../context/ThemeContext';

interface LoginFormContainerProps {
    children: React.ReactNode;
}

const LoginFormContainer = ({children}: LoginFormContainerProps) => {
    const { theme } = useTheme();

    return (
        <div className={style(theme)}>
            {children}
        </div>
    );
};

const style = (theme : Theme) => css`
    padding: 20px;
    border-radius: 10px;
    background-color: ${theme.colors.white};
`

export default LoginFormContainer;