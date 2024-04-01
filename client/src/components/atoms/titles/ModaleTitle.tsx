import { css } from '@emotion/css';
import { useTheme } from '../../../context/ThemeContext';
import { Theme } from '../../../theme/theme';

type Props = {title: string};

const ModaleTitle = ({title} : Props) => {
    const { theme } = useTheme();
    return <h1 className={style(theme)}>{title}</h1>;
};

const style = (theme: Theme)=> css`
    color: ${theme.colors.orange};
    margin-left: auto;
    padding-bottom: 20px;
    text-align: center;
    margin: 0;
`

export default ModaleTitle;