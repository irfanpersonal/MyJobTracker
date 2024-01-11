import styled from 'styled-components';

interface LoadingProps {
    title: string,
    position: 'normal' | 'center',
    marginTop?: string
}

const Loading: React.FunctionComponent<LoadingProps> = ({title, position, marginTop}) => {
    return (
        <Wrapper style={{justifyContent: position === 'center' ? 'center' : 'flex-start', marginTop: marginTop}}>
            <div className="loading"></div>
            <h1>{title}</h1>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    .loading {
        border: 0.5rem solid black;
        border-top: 0.5rem solid red;
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export default Loading;