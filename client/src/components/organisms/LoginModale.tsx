import React from 'react';
import { css } from '@emotion/css';
import { useState } from 'react';

import FormInput from '../atoms/form/FormInput';
import SendFormBtn from '../atoms/form/SendFormBtn';
import LogForm from '../molecules/LogForm';
import ModaleTitle from '../atoms/titles/ModaleTitle';

import { logIn } from "../../service/userService";

const LoginModale = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handlInputEmail = (email: string) =>{
        setEmail(email)
    }

    const handlInputPassword = (password: string) =>{
        setPassword(password)
    }

    const sendForm = () =>{
        logIn(email, password)
        .then(data => console.log(data))
    }

    return (
        <div className={style}>
            <ModaleTitle title="Se Connecter" />
            <LogForm>
                <FormInput type="text" placeholder="Email" onChange={(e) => handlInputEmail(e.target.value)} />
                <FormInput type="password" placeholder="Mot de passe" onChange={(e) => handlInputPassword(e.target.value)} />
                <SendFormBtn text="Se Connecter" onClick={sendForm} />
            </LogForm>
        </div>
    );
};

const style = css`
    position: fixed;
    border: 1px solid var(--black);
    padding: 20px;
    width: 50%;
    left: 25%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    border-radius: 10px;
`

export default LoginModale;