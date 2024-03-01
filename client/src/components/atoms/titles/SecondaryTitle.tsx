interface SecondaryTitleProps {
    text: string;
}

const SecondaryTitle = ({text}: SecondaryTitleProps) => {
    return <h2>{text}</h2>;
};

export default SecondaryTitle;