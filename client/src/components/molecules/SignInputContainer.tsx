import { css } from "@emotion/css";

interface Props {
    children: React.ReactNode;
};

const SignUpForm = ({ children } : Props) => {
    return <div className={style}>{children}</div>;
};

const style = css`
    display: flex;
    flex-direction: column;
`

export default SignUpForm;