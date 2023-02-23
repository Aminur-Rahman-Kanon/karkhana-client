import React, { useEffect, useState } from 'react';
import styles from './register.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignature, faAt, faLock } from '@fortawesome/free-solid-svg-icons';
import Backdrop from '../Others/Backdrop/backdrop';
import Modal from '../Others/Modal/modal';

const Register = () => {

    const [firstName, setFisrtName] = useState('');
    
    const [lastName, setLastName] = useState('');

    const [email, setEmail] = useState('');
    const [emailValidity, setEmailValidity] = useState(true);
    const [pendingEmail, setPendingEmail] = useState(true);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberValidity, setPhoneNumberValidity] = useState(true);
    const [pendingPhoneNumber, setPendingPhoneNumber] = useState(true);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [pendingPassword, setPensingPassword] = useState(true);
    
    const [btnDisable, setBtnDisable] = useState(true);

    const [status, setStatus] = useState('');

    const [spinner, setSpinner] = useState(false);
    const [modal, setModal] = useState(false);
    const [backdrop, setBackdrop] = useState(false);

    useEffect(() => {
        const emailHandler = setTimeout(() => {
            if (email) {
                const check1 = email.includes('@');
                const check2 = email.includes('.com');

                if (check1 && check2){
                    const domain = email.slice(email.indexOf('@') + 1, email.indexOf('.com'));
                    if (domain){
                        setEmailValidity(true);
                        setPendingEmail(false);
                    }
                }
                else {
                    setEmailValidity(false);
                    setPendingEmail(true);
                }
            }
        }, 1200)

        return () => clearTimeout(emailHandler);
    }, [email])

    useEffect(() => {
        const phoneNumberHandler = setTimeout(() => {
            if (phoneNumber){
                if (phoneNumber.length === 11){
                    setPhoneNumberValidity(true);
                    setPendingPhoneNumber(false);
                }
                else {
                    setPhoneNumberValidity(false);
                    setPendingPhoneNumber(true);
                }
            }
        }, 1200)

        return () => clearTimeout(phoneNumberHandler);
    }, [phoneNumber])

    useEffect(() => {
        const passwordHandler = setTimeout(() => {
            if (password.length > 0 && confirmPassword.length > 0) {
                if (password === confirmPassword){
                    setPasswordMatch(true);
                    setPensingPassword(false);
                }
                else {
                    setPasswordMatch(false);
                    setPensingPassword(true);
                }
            }
        }, 1200)

        return () => clearTimeout(passwordHandler);
    }, [password, confirmPassword])

    useEffect(() => {
        if (firstName && lastName && (email && !pendingEmail && emailValidity) && (phoneNumber&& !pendingPhoneNumber && phoneNumberValidity) && (password && confirmPassword && !pendingPassword &&passwordMatch)){
            setBtnDisable(false);
        }
        else {
            setBtnDisable(true);
        }
    }, [firstName, lastName, email, pendingEmail, phoneNumber, pendingPhoneNumber, password, confirmPassword, pendingPassword, passwordMatch])

    const submitFormHandler = (e) => {
        e.preventDefault();
        setSpinner(true);

        fetch('http://localhost:8000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName, lastName, email, phoneNumber, password
            })
        }).then(res => res.json()).then(data => {
            if (data.status === 'success'){
                console.log(data.status);
                setSpinner(false);
                setStatus(data.status);
                setModal(true);
                setBackdrop(true);
            }
            else if (data.status === 'user exist'){
                console.log(data.status);
                setSpinner(false);
                setStatus(data.status);
            }
            else {
                setSpinner(false)
                setStatus('error');
                setModal(true);
                setBackdrop(true);
            }
        }).catch(err => {
            console.log(err);
            setSpinner(false);
            setStatus('error');
            setBackdrop(true);
            setModal(true);
        })
    }

    let displayStatusMsg = null;

    if (status === 'success'){
        displayStatusMsg = <div className={styles.displayStatusMsgMain}>
            <h2 className={styles.displayStatusMsgH1}>User registered</h2>
            <p className={styles.displayStatusMsgP}>Thank you for joining us</p>
            <button className={styles.displayStatusMsgBtn} onClick={() => window.location.href = '/login'}>Ok</button>
        </div>
    }
    else if (status === 'error'){
        displayStatusMsg = <div className={styles.displayStatusMsgMain}>
            <h2 className={styles.displayStatusMsgH1}>Something went wrong</h2>
            <p className={styles.displayStatusMsgP}>Please try again</p>
            <button className={styles.displayStatusMsgBtn} onClick={() => {
                setStatus('');
                setModal(false);
                setBackdrop(false);
            }}>Ok</button>
        </div>
    }

    return (
        <>
        <Backdrop backdrop={backdrop} toggleBackdrop={() => {
            if (modal){
                setModal(false);
                setBackdrop(false);
            }
            else {
                setBackdrop(false);
            }
        }}/>
        <Modal modal={modal}>
            {displayStatusMsg}
        </Modal>
        <div className={styles.registerMain}>
            <div className={styles.registerContainerBg}>

            </div>
            <form className={styles.resgisteFormContainer}>
                <div className={styles.inputContainer}>
                    <input type="text"
                           className={styles.input}
                           placeholder="First name"
                           onChange={(e) => setFisrtName(e.target.value)}/>
                    <FontAwesomeIcon icon={faSignature} className={styles.inputIcon}/>
                </div>
                <div className={styles.inputContainer}>
                    <input type="text"
                           className={styles.input}
                           placeholder="Last name"
                           onChange={(e) => setLastName(e.target.value)}/>
                    <FontAwesomeIcon icon={faSignature} className={styles.inputIcon}/>
                </div>
                <div className={emailValidity ? styles.inputContainer : `${styles.inputContainer} ${styles.wrongInput}`}>
                    <input type="email"
                        className={styles.input}
                        placeholder="Email address"
                        onChange={(e) => {
                            if (status){
                                setStatus('')
                                setEmail(e.target.value)
                            }
                            else {
                                setEmail(e.target.value)
                            }
                        }}/>
                    <FontAwesomeIcon icon={faAt} className={styles.inputIcon}/>
                    <p className={styles.errorMsg} style={status === 'user exist' ? {display: 'block'} : {display: 'none'}}>User exists</p>
                </div>
                <div className={phoneNumberValidity ? styles.inputContainer : `${styles.inputContainer} ${styles.wrongInput}`}>
                    <input type="number"
                           className={styles.input}
                           placeholder="Phone number"
                           onChange={(e) => setPhoneNumber(e.target.value)}/>
                    <FontAwesomeIcon icon={faLock} className={styles.inputIcon}/>
                </div>
                <div className={styles.inputContainer}>
                    <input type="password"
                           className={styles.input}
                           placeholder="Password"
                           onChange={(e) => setPassword(e.target.value)}/>
                    <FontAwesomeIcon icon={faLock} className={styles.inputIcon}/>
                </div>
                <div className={styles.inputContainer}>
                    <input type="password"
                           className={styles.input}
                           placeholder="Confirm password"
                           onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <FontAwesomeIcon icon={faLock} className={styles.inputIcon}/>
                    <p className={styles.errorMsg} style={!passwordMatch ? {display: 'block'} : {display: 'none'}}>Password doesn't match</p>
                </div>

                <button disabled={btnDisable} className={styles.registerBtn} onClick={ submitFormHandler }>Register</button>
            </form>
        </div>
        </>
    )
}

export default Register;
