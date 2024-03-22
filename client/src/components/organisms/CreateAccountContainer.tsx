import { css } from "@emotion/css";

interface Props {
    children: React.ReactNode;
    position: string;
};

const CreateAccountContainer = ({children, position} : Props) => {
    return <div className={style(position)}>{children}</div>;
};

const style = (position: string)=>css`
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    padding-left: 20px;
    justify-content: center;

    // Right position (form)
    ${position === 'right' ? 'margin-right: 20px;' : ''}

    // Left position (presentation)
    ${position === 'left' ? 'margin-right: 20px;' : ''}
    ${position === 'left' ? 'background-color: var(--light-orange);' : ''}
    ${position === 'left' ? 'border-radius: 0 20px 20px 0;' : ''}
`

export default CreateAccountContainer;