import { css } from "@emotion/css";

type Props = {};

const Separation = ({} : Props) => {
    return <hr className={style} />;
};

const style = css`
    width: 70%;
    margin: 20px auto;
`

export default Separation;