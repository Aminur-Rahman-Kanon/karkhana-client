import React, { useEffect, useState } from 'react';
import styles from './forgotPassword.module.css';
import logo from '../../../Assets/Logo/logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../Others/Modal/modal';
import Backdrop from '../../Others/Backdrop/backdrop';
import Spinner from '../../Others/Spinner/spinner';
import { ForgotPasswordHandlerMessage } from '../../Others/DisplayMessage/displayMessage';

function ForgotPassword() {

    const [email, setEmail] = useState('');

    const [emailValidity, setEmailValidity] = useState(true);

    const [btnDisable, setBtnDisable] = useState(true);

    const [status, setStatus] = useState('');

    const [modal, setModal] = useState(false);

    const [backdrop, setBackdrop] = useState(false);

    const [spinner, setSpinner] = useState(false);

    //custom hook to update emailValidity and btnDisable after 1300ms of on onChange event
    useEffect(() => {
        const checkEmail = setTimeout(() => {
            const elementDiv = document.querySelector(`.${styles.inputContainer}`);
            const input = document.querySelector(`.${styles.input}`);
            const label = document.querySelector(`.${styles.label}`);
            const check1 = email.includes('@');
            const check2 = email.includes('.com');
            if (email){
                if (check1 && check2){
                    const domain = email.slice(email.indexOf('@')+1, email.indexOf('.com'));
                    if (domain.length > 0){
                        elementDiv.style.border = '1px solid rgb(190, 190, 190)';
                        label.style.color = 'black'
                        setEmailValidity(true);
                        setBtnDisable(false);
                    }
                    else {
                        elementDiv.style.border = '1px solid #ff0000e6';
                        label.style.color = '#ff0000e6'
                        setEmailValidity(false);
                        setBtnDisable(true);
                    }
                }
                else {
                    elementDiv.style.border = '1px solid #ff0000e6';
                    label.style.color = '#ff0000e6'
                    setEmailValidity(false);
                    setBtnDisable(true);
                }
            }
        }, 1300);

        return () => clearTimeout(checkEmail);
    }, [email]);

    //handle sumit function
    const submitFormHandler = (e) => {
        e.preventDefault();
        setSpinner(true);

        fetch('https://karkhana-server.onrender.com/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        }).then(res => res.json())
        .then(result => {
            setSpinner(false);
            setStatus(result.status);
            setBackdrop(true);
            setModal(true);
        })
        .catch(err => {
            setSpinner(false);
            setStatus('something went wrong');
            setModal(true);
        });
    }
    
    //custom onClick effect on input elements
    const focusElement = () => {
        const elementDiv = document.querySelector(`.${styles.inputContainer}`);
        const input = document.querySelector(`.${styles.input}`);
        const label = document.querySelector(`.${styles.label}`);

        label.className = `${styles.label} ${styles.activeLabel}`;
        elementDiv.style.border = '1px solid black';
        input.placeholder = '';
    }

    //custom leaveFocus effect on input elements
    const leaveFocus = () => {
        const elementDiv = document.querySelector(`.${styles.inputContainer}`);
        const input = document.querySelector(`.${styles.input}`);
        const label = document.querySelector(`.${styles.label}`);

        if (input.value === '' || input.value === null){
            label.className = `${styles.label}`;
            input.placeholder = 'Email Address';
            elementDiv.style.border = '1px solid rgb(190, 190, 190)';
        }
    }

    //method to close modal
    const displayMessagehandler = () => {
        setStatus('');
        setModal(false);
        setBackdrop(false);
    }
    
  return (
    <>
    <Backdrop backdrop={backdrop}/>
    <Modal modal={modal}>
        <ForgotPasswordHandlerMessage status={status} buttonHandler={displayMessagehandler}/>
    </Modal>
    <Spinner spinner={spinner} />
    <div className={styles.forgotPasswordMain}>
        <form className={styles.forgotPasswordContainer}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="forgot-password-logo" className={styles.logo}/>
            </div>
            <h3 className={styles.logoHeading}>Enter the email address associated with your account and we’ll send you a link to reset your password.</h3>

            <div className={styles.inputContainer}>
                <input type="email"
                       data-testid="email"
                       required
                       className={styles.input}
                       placeholder='Email Address'
                       onChange={(e) => setEmail(e.target.value)}
                       onFocus={ focusElement }
                       onBlur={ leaveFocus }/>
                <FontAwesomeIcon icon={faEnvelope} className={styles.inputIcon} />
                <div className={styles.label}>Email Address</div>
            </div>

            <button disabled={btnDisable} className={styles.passwordResetBtn} onClick={ submitFormHandler }>Send Password Reset Link</button>
        </form>
    </div>
    </>
  )
}

export default ForgotPassword;
