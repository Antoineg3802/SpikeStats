import React, { useState, useEffect } from 'react';
import { css } from '@emotion/css';

import FormInput from '../atoms/form/FormInput';
import SendFormBtn from '../atoms/form/SendFormBtn';
import LogForm from '../molecules/LogForm';
import ModaleTitle from '../atoms/titles/ModaleTitle';

import { logIn } from "../../service/userService";
import FormError from '../atoms/form/FormError';

interface LoginModaleProps {
    visible: boolean;
}

const LoginModale = ({visible} : LoginModaleProps) => {

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
        logIn(email, password)
        .then((data): void => {
            console.log(data)
            if (data === "Connected") {
                document.cookie = `isAuthenticated=true`;
                setVisibleModale(false)
            }else{
                setError(data)
                setTimeout(() => {
                    setError("");
                }, 3000); // 3 seconds timeout
            }
        })
    }

    useEffect(() => {
        setVisibleModale(visible);
    }, [visible]);

    return (
        <div className={style(visibleModale)}>
            <ModaleTitle title="Se Connecter" />
            <LogForm>
                <FormInput type="text" placeholder="Email" onChange={(e) => handlInputEmail(e.target.value)} />
                <FormInput type="password" placeholder="Mot de passe" onChange={(e) => handlInputPassword(e.target.value)} />
                {error && <FormError text={error} />}
                <SendFormBtn disabled={false} text="Se Connecter" onClick={sendForm} />
            </LogForm>
        </div>
    );
};

const style = (visible: boolean) => css`
    position: fixed;
    border: 1px solid var(--black);
    padding: 20px;
    width: 50%;
    left: 25%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    border-radius: 10px;
    background-color: var(--white);
    display: ${visible ? "block" : "none"};
`

export default LoginModale;