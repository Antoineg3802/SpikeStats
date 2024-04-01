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
    border: 1px solid ${theme.colors.black};
    padding: 20px;
    width: 50%;
    transform: translateY(-50%);
    border-radius: 10px;
    background-color: ${theme.colors.white};
`

export default LoginFormContainer;