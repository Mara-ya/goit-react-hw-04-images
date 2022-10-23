import { useEffect } from "react";
import { createPortal } from 'react-dom';
import { Overlay, ModalStyle } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

export default function Modal ({ onClose, children }){
    useEffect(() => {
        function handleKeyDown (e) {
            if(e.code === 'Escape'){
                onClose();
            }
        }
        
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [onClose]);


    function handleBackdropClick (event) {
        if(event.currentTarget === event.target){
            onClose();
        }
    }

    return createPortal(
        <Overlay onClick={handleBackdropClick}>
            <ModalStyle>
                {children}
            </ModalStyle>
        </Overlay>, modalRoot
    )
}
