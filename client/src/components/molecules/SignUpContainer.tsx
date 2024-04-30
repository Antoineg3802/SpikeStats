import { css } from "@emotion/css";

interface Props {
    submitForm: (e: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
};

const SignUpForm = ({ submitForm, children }: Props) => {
    return <form className={style} onSubmit={(e) => submitForm(e)}>{children}</form>;
};

const style = css`
    display: flex;
    width: 75%;
    flex-direction: column;
`

export default SignUpForm;