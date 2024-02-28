import { css } from '@emotion/css';

type Props = {title: string};

const ModaleTitle = ({title} : Props) => {
    return <h1 className={style}>{title}</h1>;
};

const style = css`
    color: var(--orange);
    margin-left: auto;
    padding-bottom: 20px;
    text-align: center;
    margin: 0;
`

export default ModaleTitle;