import { css } from '@emotion/css';

interface LogFormProps {
    children: React.ReactNode;
}

const LogForm = ({children} : LogFormProps) => {
    return <div className={style}>{children}</div>;
};

const style = css`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default LogForm;