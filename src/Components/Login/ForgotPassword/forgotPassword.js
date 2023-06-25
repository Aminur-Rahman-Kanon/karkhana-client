import React, { useEffect, useState } from 'react';
import styles from './forgotPassword.module.css';
import logo from '../../../Assets/logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../Others/Modal/modal';
import Backdrop from '../../Others/Backdrop/backdrop';
import Spinner from '../../Others/Spinner/spinner';


function ForgotPassword() {

    const [email, setEmail] = useState('');

    const [emailValidity, setEmailValidity] = useState(true);

    const [btnDisable, setBtnDisable] = useState(true);

    const [status, setStatus] = useState('');

    const [modal, setModal] = useState(false);

    const [backdrop, setBackdrop] = useState(false);

    const [spinner, setSpinner] = useState(false);

    //update emailValidity and btnDisable after 1300ms of on onChange event
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
        });
    }

    //label moving up effect on mouseClick on input field
    const focusElement = () => {
        const elementDiv = document.querySelector(`.${styles.inputContainer}`);
        const input = document.querySelector(`.${styles.input}`);
        const label = document.querySelector(`.${styles.label}`);

        label.className = `${styles.label} ${styles.activeLabel}`;
        elementDiv.style.border = '1px solid black';
        input.placeholder = '';
    }

    //label moving up effect on mouseClick on input field
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

    //display message depending on the response from server
    let displayStatus = null;

    if (status === 'success'){
        displayStatus = <div className={styles.displayStatusContainer}>
            <h3 className={styles.displayStatusHeading}>A link has been sent to your email</h3>
            <p className={styles.displayStatusP}>PLease follow the instruction to reset your password and dont forget to check the spam folder id you can't find the email</p>
            <button className={styles.displayStatusBtn} onClick={() => window.location.href = '/login'}>Ok</button>
        </div>
    }
    else if (status === 'user not found') {
        displayStatus = <div className={styles.displayStatusContainer}>
            <h3 className={styles.displayStatusHeading}>User not found</h3>
            <p className={styles.displayStatusP}>Please make sure you are registered  with us</p>
            <button className={styles.displayStatusBtn} onClick={() => {
                setStatus('');
                setModal(false);
                setBackdrop(false);
            }}>Ok</button>
        </div>
    }
    else {
        displayStatus = <div className={styles.displayStatusContainer}>
            <h3 className={styles.displayStatusHeading}>Something went wrong</h3>
            <p className={styles.displayStatusP}>Please try again</p>
            <button className={styles.displayStatusBtn} onClick={() => {
                setStatus('');
                setModal(false);
                setBackdrop(false);
            }}>Ok</button>
        </div>
    }
  return (
    <>
    <Backdrop backdrop={backdrop}/>
    <Modal modal={modal}>
        {displayStatus}
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
