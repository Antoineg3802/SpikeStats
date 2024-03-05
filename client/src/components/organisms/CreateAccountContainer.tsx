import { css } from "@emotion/css";

interface Props {
    children: React.ReactNode;
    position: string;
};

const CreateAccountContainer = ({children, position} : Props) => {
    return <div className={style(position)}>{children}</div>;
};

const style = (position: string)=>css`
    ${position === 'left' ? 'margin-right: 20px;' : ''}
    ${position === 'right' ? 'margin-right: 20px;' : ''}
    width: 50%;
    padding-left: 20px;
`

export default CreateAccountContainer;