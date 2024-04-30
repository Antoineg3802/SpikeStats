import { css } from '@emotion/css'
import { Theme } from '../../theme/theme'
import ContentText from '../atoms/content/ContentText'
import SendFormBtn from '../atoms/form/SendFormBtn'
import SecondaryTitle from '../atoms/titles/SecondaryTitle'
import { useTheme } from '../../context/ThemeContext'

const NotConnected = ()=>{

    function handleClick(){
        window.location.href = '/login?redirect=/dashboard'
    }

    const {theme} = useTheme();

    return (
        <div className={style(theme)}>
            <SecondaryTitle text="Vous n'êtes pas connecté" />
            <ContentText>Connectez-vous pour accéder à votre tableau de bord</ContentText>
            <button onClick={handleClick} disabled={false}>Se Connecter</button>
        </div>
    )
}

const style = (theme: Theme)=> css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid ${theme.colors.black};
    background-color: ${theme.colors.white};
    border-radius: 10px;
    padding: 20px;
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
    filter: none;
`

export default NotConnected