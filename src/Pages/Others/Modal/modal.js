import React from "react";
import ReactDom from 'react-dom';

const Modal = ({modal, children}) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1000'
    }

    if (!modal) return;

    return ReactDom.createPortal(
        <div style={style}>
            { children }
        </div>
        ,document.getElementById('portal')
    )
}

export default Modal;
