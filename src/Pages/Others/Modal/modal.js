import React from "react";
import ReactDom from 'react-dom';
import styles from './modal.module.css';

const Modal = ({modal, children}) => {

    if (!modal) return;

    return ReactDom.createPortal(
        <div className={styles.modalMain}>
            { children }
        </div>
        ,document.getElementById('portal')
    )
}

export default Modal;
