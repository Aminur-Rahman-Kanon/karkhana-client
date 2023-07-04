import React, { useEffect, useState } from 'react';
import styles from './registerMain.module.css';
import Backdrop from '../../Others/Backdrop/backdrop';
import Modal from '../../Others/Modal/modal';
import Spinner from '../../Others/Spinner/spinner';
import { RegisterHandlerMessage } from '../../Others/DisplayMessage/displayMessage';
import RegisterForm from '../RegisterForm/registerForm';

const RegisterMain = () => {

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

    //Hook for email validation
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

    //Hook for phone number validation
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

    //Hook for password validation
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

    //Hook to enable/disable Register button
    useEffect(() => {
        if (firstName && lastName && (email && !pendingEmail && emailValidity) && (phoneNumber&& !pendingPhoneNumber && phoneNumberValidity) && (password && confirmPassword && !pendingPassword &&passwordMatch)){
            setBtnDisable(false);
        }
        else {
            setBtnDisable(true);
        }
    }, [firstName, lastName, email, pendingEmail, phoneNumber, pendingPhoneNumber, password, confirmPassword, pendingPassword, passwordMatch])

    //Register submit function
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

    //method to close modal
    const displayMessageHandler = () => {
        setStatus('');
        setModal(false);
        setBackdrop(false);
    }

    //Object of methods to feed to the RegisterForm component
    const updateMethods = {
        setFisrtName, setLastName, setStatus, setEmail, setPhoneNumber, setPassword, setConfirmPassword, submitFormHandler
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
            <RegisterHandlerMessage status={status} buttonHandler={displayMessageHandler}/>
        </Modal>
        <div className={styles.registerMain}>
            <div className={styles.registerContainerBg}>

            </div>
            <RegisterForm status={status}
                          phoneNumberValidity={phoneNumberValidity}
                          btnDisable={btnDisable}
                          emailValidity={emailValidity}
                          passwordMatch={passwordMatch}
                          updateMethods={updateMethods} />
        </div>
        </>
    )
}

export default RegisterMain;
