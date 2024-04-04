import { useState } from "react";
import { css } from "@emotion/css";

import FormInput from "../atoms/form/FormInput";
import SendFormBtn from "../atoms/form/SendFormBtn";
import MainTitle from "../atoms/titles/MainTitle";
import SignUpContainer from "../molecules/SignUpContainer";
import SecondaryTitle from "../atoms/titles/SecondaryTitle";
import FormSelect from "../atoms/form/FormSelect";
import CreateAccountContainer from "../organisms/CreateAccountContainer";
import FormSingleLine from "../molecules/FormSingleLine";

import { signUpPlayer, signUpCoach } from "../../service/api/userService";
import { isValidEmail } from "../../service/global/verifications";
import FormIndicator from "../atoms/form/FormIndicator";
import { useTheme } from "../../context/ThemeContext";
import { Theme } from "../../theme/theme";

const CreateAccount = () => {
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmed, setPasswordConfirmed] = useState<string>("");
    const [userType, setUserType] = useState<string>("");
    const { theme } = useTheme();

    const [error, setError] = useState<string>("");
    const [confirmed, setconfirmed] = useState<string>("");

    function handlInputPassword(password: string) {
        setPassword(password)
    }

    function handlInputConfirmedPassword(password: string) {
        setPasswordConfirmed(password)
    }

    function handlInputEmail(email: string) {
        setEmail(email)
    }

    function handlInputLastname(lastname: string) {
        setLastname(lastname)
    }

    function handlInputFirstname(firstname: string) {
        setFirstname(firstname)
    }

    function handleInputTypeUser(type: string) {
        setUserType(type)
    }

    function handleFormSend(firstname: string, lastname: string, email: string, password: string, passwordConfirmed: string, type: string){
        if (firstname === "" || lastname === "" || email === "" || password === "" || passwordConfirmed === "" || type === "") {
            setError("Veuillez renseigner tous les champs");
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        }
        if (!isValidEmail(email)) {
            setError("Veuillez renseigner un email valide");
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        }
        if (password !== passwordConfirmed) {
            setError("Les mots de passe ne correspondent pas")
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        }
        if (type === "player") {
            signUpPlayer(firstname, lastname, email, password)
            .then((data) => {
                if (data.success){
                    setconfirmed("Votre compte a bien été créé, vous allez être redirigé...")
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 3000);
                }else{
                    setError(data.message as string)
                    setTimeout(() => {
                        setError("");
                    }, 3000);
                }
            })
        }else if (type === "coach") {
            signUpCoach(firstname, lastname, email, password)
            .then((data) => {
                if (data.success){
                    setconfirmed("Votre compte a bien été créé, vous allez être redirigé...")
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 3000);
                }else{
                    setError(data.message as string)
                    setTimeout(() => {
                        setError("");
                    }, 3000);
                }
            })
        }
    }

    return (
        <div className={style(theme)}>
            <CreateAccountContainer position="left">
                <MainTitle text="Bienvenue sur SpikeStats" />
            </CreateAccountContainer>
            <CreateAccountContainer position="right">
                <SecondaryTitle text="Créez votre compte"/>
                <SignUpContainer>
                    <FormSingleLine gap={5}>
                        <FormInput type="text" widthPourcentage={50} placeholder="Prénom" onChange={(e) => handlInputFirstname(e.target.value)} />
                        <FormInput type="text" widthPourcentage={50} placeholder="Nom" onChange={(e) => handlInputLastname(e.target.value)} />
                    </FormSingleLine>
                    <FormInput type="text" widthPourcentage={100} placeholder="Email" onChange={(e) => handlInputEmail(e.target.value)} />
                    <FormInput type="text" widthPourcentage={100} placeholder="Mot de passe" onChange={(e) => handlInputPassword(e.target.value)} />
                    <FormInput type="text" widthPourcentage={100} placeholder="Confirmation de mot de passe" onChange={(e) => handlInputConfirmedPassword(e.target.value)} />
                    <FormSelect widthPourcentage={100} onChange={(e)=>handleInputTypeUser(e.target.value)}>
                        <option value="none" selected disabled>Je suis...</option>
                        <option value="coach">Un coach</option>
                        <option value="player">Un joueur</option>
                    </FormSelect>
                    <SendFormBtn onClick={() => handleFormSend(firstname, lastname, email, password, passwordConfirmed, userType) } text="Créer mon compte" disabled={false} />
                    {error && <FormIndicator color="#dc3545" backgroundColor="#f8d7da" text={error} />}
                    {confirmed && <FormIndicator color="#198754" backgroundColor="#a3cfbb" text={confirmed} />}
                </SignUpContainer>
            </CreateAccountContainer>
        </div>
    );
};
const style = (theme: Theme)=>css`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: ${theme.colors.white};
`

export default CreateAccount;