import { css } from '@emotion/css';

interface LogFormProps {
    sendForm?: (e:React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
}

const LogForm = ({children, sendForm} : LogFormProps) => {
    return <form className={style} onSubmit={sendForm}>{children}</form>;
};

const style = css`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default LogForm;