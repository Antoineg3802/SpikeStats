import { useState } from "react";
import FormInput from "../atoms/form/FormInput";
import SendFormBtn from "../atoms/form/SendFormBtn";
import MainTitle from "../atoms/titles/MainTitle";
import { css } from "@emotion/css";
import SignInputContainer from "../molecules/SignInputContainer";
import SecondaryTitle from "../atoms/titles/SecondaryTitle";
import FormSelect from "../atoms/form/FormSelect";
import CreateAccountContainer from "../organisms/CreateAccountContainer";

const CreateAccount = () => {
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmed, setPasswordConfirmed] = useState<string>("");

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

    return (
        <div className={style}>
            <CreateAccountContainer position="left">
                <MainTitle text="Bienvenue sur SpikeStats" />
            </CreateAccountContainer>
            <CreateAccountContainer position="right">
                <SecondaryTitle text="Créez votre compte"/>
                <SignInputContainer>
                    <FormInput type="text" placeholder="Prénom" onChange={(e) => handlInputFirstname(e.target.value)} />
                    <FormInput type="text" placeholder="Nom" onChange={(e) => handlInputLastname(e.target.value)} />
                    <FormInput type="text" placeholder="Email" onChange={(e) => handlInputEmail(e.target.value)} />
                    <FormInput type="text" placeholder="Mot de passe" onChange={(e) => handlInputPassword(e.target.value)} />
                    <FormInput type="text" placeholder="Confirmation de mot de passe" onChange={(e) => handlInputConfirmedPassword(e.target.value)} />
                    <FormSelect onChange={(e)=>console.log(e.target.value)}>
                        <option value="none" selected disabled>Je suis...</option>
                        <option value="coach">Un coach</option>
                        <option value="player">Un joueur</option>
                    </FormSelect>
                    <SendFormBtn onClick={() => console.log("tata") } text="Créer mon compte" disabled={false} />
                </SignInputContainer>
            </CreateAccountContainer>
        </div>
    );
};
const style = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 100vh;
`

export default CreateAccount;