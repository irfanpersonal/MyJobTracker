import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import {useDispatchType, useSelectorType} from '../store';
import {setPage} from '../features/job/jobSlice';
import {getAllJobs} from '../features/job/jobThunk';
import {nanoid} from 'nanoid';

const PaginationBox: React.FunctionComponent = () => {
    const dispatch = useDispatch<useDispatchType>();
    const {numberOfPages, page} = useSelector((store: useSelectorType) => store.job);
    return (
        <Wrapper>
            {Array.from({length: Number(numberOfPages)}, (_, index) => {
                return (
                    <span key={nanoid()} style={{backgroundColor: page === index + 1 ? 'white' : 'rgb(229, 225, 218)'}} onClick={() => {
                        dispatch(setPage(index + 1));
                        dispatch(getAllJobs());
                    }}>{index + 1}</span>
                );
            })}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    span {
        cursor: pointer;
        display: inline-block;
        padding: 0.5rem 1rem;
        margin: 0 0.15rem;
        background-color: rgb(229, 225, 218);
        border-radius: 0.25rem;
        border: 1px solid black;
    }
`;

export default PaginationBox;