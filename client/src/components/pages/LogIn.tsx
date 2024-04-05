import { css } from "@emotion/css";
import { useTheme } from "../../context/ThemeContext";
import { Theme } from "../../theme/theme";
import { useState } from "react";

// import services
import { logIn } from "../../service/api/userService";
import { isValidEmail } from "../../service/global/verifications";

// import components
import FormInput from "../atoms/form/FormInput";
import FormIndicator from "../atoms/form/FormIndicator";
import SendFormBtn from "../atoms/form/SendFormBtn";
import Separation from "../atoms/Separation";
import SpanWithLink from "../atoms/SpanWithLink";
import MainTitle from "../atoms/titles/MainTitle";
import SecondaryTitle from "../atoms/titles/SecondaryTitle";
import LogForm from "../molecules/LogForm";
import LoginFormContainer from "../organisms/LoginFormContainer";
import CreateAccountContainer from "../organisms/CreateAccountContainer";

const LogIn = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const { theme } = useTheme();

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
                        // chheck params in url to redirect
                        const url = new URL(window.location.href);
                        const redirect = url.searchParams.get("redirect");
                        if(redirect) {
                            window.location.href = redirect
                        }else{
                            window.location.href = "/";
                        }
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
	return (
        <div className={style(theme)}>
            <CreateAccountContainer position="left">
                <MainTitle text="Bienvenue sur SpikeStats" />
            </CreateAccountContainer>
            <CreateAccountContainer position="right">
                <LoginFormContainer>
                    <LogForm>
                        <SecondaryTitle text="Se connecter" />
                        <FormInput type="text" placeholder="Email" onChange={(e) => handlInputEmail(e.target.value)} />
                        <FormInput type="password" placeholder="Mot de passe" onChange={(e) => handlInputPassword(e.target.value)} />
                        {error && <FormIndicator backgroundColor="#f8d7da" color="red" text={error} />}
                        <SendFormBtn disabled={false} text="Se Connecter" onClick={sendForm} />
                    </LogForm>
                    <Separation />
                    <SpanWithLink text="Vous n'avez pas de compte ?" textHref="Créer un compte" href="/create-account" />
                </LoginFormContainer>
            </CreateAccountContainer>
        </div>
    );
};

const style =(theme: Theme)=>css`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: ${theme.colors.white};
`

export default LogIn;