import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './register.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignature, faAt, faLock, faPhone } from '@fortawesome/free-solid-svg-icons';
import Backdrop from '../Others/Backdrop/backdrop';
import Modal from '../Others/Modal/modal';
import Spinner from '../Others/Spinner/spinner';

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

    const submitFormHandler = async (e) => {
        e.preventDefault();
        setSpinner(true);

        await fetch('https://karkhana-server.onrender.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName, lastName, email, phoneNumber, password
            })
        }).then(res => res.json()).then(data => {
            if (data.status === 'success'){
                setSpinner(false);
                setStatus(data.status);
                setModal(true);
                setBackdrop(true);
            }
            else if (data.status === 'user exist'){
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
            setSpinner(false);
            setStatus('error');
            setBackdrop(true);
            setModal(true);
        })
    }

    let displayStatusMsg = null;

    if (status === 'success'){
        displayStatusMsg = <div className={styles.displayStatusMsgMain}>
            <h2 data-testid="registered" className={styles.displayStatusMsgH1}>User registered</h2>
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

    const focusElement = (index) => {
        const elementDiv = document.querySelectorAll(`.${styles.inputContainer}`);
        const input = document.querySelectorAll(`.${styles.input}`);
        const label = document.querySelectorAll(`.${styles.label}`);

        label.item(index).className = `${styles.label} ${styles.activeLabel}`;
        elementDiv.item(index).style.border = '1px solid white';
        input.item(index).placeholder = '';
    }

    const leaveFocus = (index, item) => {
        const elementDiv = document.querySelectorAll(`.${styles.inputContainer}`);
        const input = document.querySelectorAll(`.${styles.input}`);
        const label = document.querySelectorAll(`.${styles.label}`);

        if (input.item(index).value === '' || input.item(index).value === null){
            label.item(index).className = `${styles.label} ${styles.label}`;
            elementDiv.item(index).style.border = '1px solid rgb(194, 194, 194)';
            input.item(index).placeholder = item;
        }
        else {
            input.item(index).placeholder = ''
            elementDiv.item(index).style.border = '1px solid rgb(194, 194, 194)';
        }
    }

    return (
        <>
        <Spinner spinner={spinner} />
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
                           data-testid="first-name"
                           className={styles.input}
                           placeholder="First name"
                           onChange={(e) => setFisrtName(e.target.value)}
                           onFocus={() => focusElement(0)}
                           onBlur={() => leaveFocus(0, 'First Name')} />
                    <FontAwesomeIcon icon={faSignature} className={styles.inputIcon}/>
                    <div className={styles.label}>{` First Name `}</div>
                </div>
                <div className={styles.inputContainer}>
                    <input type="text"
                           data-testid="last-name"
                           className={styles.input}
                           placeholder="Last name"
                           onChange={(e) => setLastName(e.target.value)}
                           onFocus={() => focusElement(1)}
                           onBlur={() => leaveFocus(1, 'Last Name')} />
                    <FontAwesomeIcon icon={faSignature} className={styles.inputIcon}/>
                    <div className={styles.label}>Last Name</div>
                </div>
                <div className={emailValidity ? styles.inputContainer : `${styles.inputContainer} ${styles.wrongInput}`}>
                    <input type="email"
                           data-testid="email"
                           className={styles.input}
                           placeholder="Email Address"
                           onChange={(e) => {
                                if (status){
                                    setStatus('')
                                    setEmail(e.target.value)
                                }
                                else {
                                    setEmail(e.target.value)
                                }
                            }}
                        onFocus={() => focusElement(2)}
                        onBlur={() => leaveFocus(2, 'Email Address')} />
                    <FontAwesomeIcon icon={faAt} className={styles.inputIcon}/>
                    <p data-testid="user-exist" className={styles.errorMsg} style={status === 'user exist' ? {display: 'block'} : {display: 'none'}}>User exists</p>
                    <div className={styles.label}>Email</div>
                </div>
                <div className={phoneNumberValidity ? styles.inputContainer : `${styles.inputContainer} ${styles.wrongInput}`}>
                    <input type="number"
                           data-testid="phone"
                           className={styles.input}
                           placeholder="Phone number"
                           onChange={(e) => setPhoneNumber(e.target.value)}
                           onFocus={() => focusElement(3)}
                           onBlur={() => leaveFocus(3, 'Phone Number')} />
                    <FontAwesomeIcon icon={faPhone} className={styles.inputIcon}/>
                    <div className={styles.label}>Phone Number</div>
                </div>
                <div className={styles.inputContainer}>
                    <input type="password"
                           data-testid="password-1"
                           className={styles.input}
                           placeholder="Password"
                           onChange={(e) => setPassword(e.target.value)}
                           onFocus={() => focusElement(4)}
                           onBlur={() => leaveFocus(4, 'Password')} />
                    <FontAwesomeIcon icon={faLock} className={styles.inputIcon}/>
                    <div className={styles.label}>Password</div>
                </div>
                <div className={styles.inputContainer}>
                    <input type="password"
                           data-testid="password-2"
                           className={styles.input}
                           placeholder="Confirm password"
                           onChange={(e) => setConfirmPassword(e.target.value)}
                           onFocus={() => focusElement(5)}
                           onBlur={() => leaveFocus(5, 'Confirm Password')} />
                    <FontAwesomeIcon icon={faLock} className={styles.inputIcon}/>
                    <p className={styles.errorMsg} style={!passwordMatch ? {display: 'block'} : {display: 'none'}}>Password doesn't match</p>
                    <div className={styles.label}>Confirm Password</div>
                </div>

                <button disabled={btnDisable} className={styles.registerBtn} onClick={ submitFormHandler }>Register</button>

                <div className={styles.loginPrompt}>
                    <p style={{color: 'lightgray'}}>Registered Already</p>
                    <Link to="/login" className={styles.loginLink}>Login</Link>
                </div>
            </form>
        </div>
        </>
    )
}

export default Register;
