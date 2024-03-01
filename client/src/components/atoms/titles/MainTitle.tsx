interface MainTitleProps {
    text: string;
}

const MainTitle = ({text}: MainTitleProps) => {
    return <h1>{text}</h1>;
};

export default MainTitle;