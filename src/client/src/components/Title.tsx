interface TitleProps {
    text: string,
    marginTop?: string,
    borderBottom: boolean
}

const Title: React.FunctionComponent<TitleProps> = ({text, marginTop, borderBottom}) => {
    const titleStyle: React.CSSProperties = {
        textAlign: 'center',
        marginTop: marginTop,
        fontFamily: 'Arial',
        color: 'rgb(81, 81, 81)',
        letterSpacing: '0.15rem',
        borderBottom: borderBottom ? '1px solid black' : 'none'
    };
    return (
        <h1 style={titleStyle}>{text}</h1>
    );
};

export default Title;
