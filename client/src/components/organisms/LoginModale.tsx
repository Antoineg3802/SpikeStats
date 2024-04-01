import React, { useState, useEffect } from 'react';
import { css } from '@emotion/css';

import FormInput from '../atoms/form/FormInput';
import SendFormBtn from '../atoms/form/SendFormBtn';
import LogForm from '../molecules/LogForm';
import ModaleTitle from '../atoms/titles/ModaleTitle';
import FormIndicator from '../atoms/form/FormIndicator';

import { logIn } from "../../service/api/userService";
import { isValidEmail } from "../../service/global/verifications";
import Separation from '../atoms/Separation';
import SpanWithLink from '../atoms/SpanWithLink';
import { useTheme } from '../../context/ThemeContext';
import { Theme } from '../../theme/theme';

interface LoginModaleProps {
    visible: boolean;
}

const LoginModale = ({visible} : LoginModaleProps) => {

    const { theme } = useTheme();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [visibleModale, setVisibleModale] = useState<boolean>(visible);
    const [error, setError] = useState<string>("");

    const handlInputEmail = (email: string) =>{
        setEmail(email)
    }

    const handlInputPassword = (password: string) =>{
        setPassword(password)
    }

    const sendForm = () =>{
        if (email === "" && password === "") {
            setError("Veuillez renseigner tous les champs")
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        }else{
            if (!isValidEmail(email)) {
                setError("Veuillez renseigner un email valide")
                setTimeout(() => {
                    setError("");
                }, 3000);
                return;
            }else{
                logIn(email, password)
                .then((data): void => {
                    if (data.success) {
                        document.cookie = `isAuthenticated=true`;
                        setVisibleModale(false)
                    }else{
                        setError(data.message as string);
                        setTimeout(() => {
                            setError("");
                        }, 3000);
                    }
                })
            }
        }
    }

    useEffect(() => {
        setVisibleModale(visible);
    }, [visible]);

    return (
        <div className={style(theme, visibleModale)}>
            <ModaleTitle title="Se Connecter" />
            <LogForm>
                <FormInput type="text" placeholder="Email" onChange={(e) => handlInputEmail(e.target.value)} />
                <FormInput type="password" placeholder="Mot de passe" onChange={(e) => handlInputPassword(e.target.value)} />
                {error && <FormIndicator backgroundColor="#f8d7da" color="red" text={error} />}
                <SendFormBtn disabled={false} text="Se Connecter" onClick={sendForm} />
            </LogForm>
            <Separation />
            <SpanWithLink text="Vous n'avez pas de compte ?" textHref="Créer un compte" href="/create-account" />
        </div>
    );
};

const style = (theme : Theme, visible: boolean) => css`
    position: fixed;
    border: 1px solid ${theme.colors.black};
    padding: 20px;
    width: 50%;
    left: 25%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    border-radius: 10px;
    background-color: ${theme.colors.white};
    display: ${visible ? "block" : "none"};
`

export default LoginModale;