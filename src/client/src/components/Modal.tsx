import styled from 'styled-components';
import {FaWindowClose} from "react-icons/fa";
import {useSelector} from 'react-redux';
import {type useSelectorType} from '../store';

interface ModalProps {
    title: string,
    description: string,
    closeModal: () => void,
    handleSubmit: (event: React.FormEvent) => void
}

const Modal: React.FunctionComponent<ModalProps> = ({title, description, closeModal, handleSubmit}) => {
    const {deleteAccountLoading} = useSelector((store: useSelectorType) => store.user);
    return (
        <Wrapper>
            <div className="modal-menu">
                <div className="title">{title}</div>
                <div><FaWindowClose onClick={closeModal} className="close"/></div>
            </div>
            <h3 className="description">{description}</h3>
            <form style={{width: '100%'}} onSubmit={handleSubmit}>
                <div>
                    <input id="password" type="password" name="password"/>
                </div>
                <button disabled={deleteAccountLoading} type="submit">{deleteAccountLoading ? 'DELETING' : 'DELETE'}</button>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    .modal-menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.5rem;
        border-bottom: 1px solid black;
    }
    .close:hover, .close:hover {
        cursor: pointer;
        color: rgb(255, 0, 77);
    }
    width: 50%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 1px solid black;
    padding: 1rem;
    .description {
        margin-bottom: 1rem;
    }
`;

export default Modal;