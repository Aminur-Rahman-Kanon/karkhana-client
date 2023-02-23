import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faAt } from '@fortawesome/free-solid-svg-icons';
import styles from './login.module.css';
import Backdrop from "../Others/Backdrop/backdrop";
import Modal from "../Others/Modal/modal";
import { Link } from "react-router-dom";

const Login = () => {

    const [email ,setEmail] = useState('');
    const [emailValidity, setEmailValidty] = useState(true);

    const [password, setPassword] = useState('');
    const [passwordValidity, setPasswordValidity] = useState(true);

    const [spinner, setSpinner] = useState(false);
    const [status, setStatus] = useState('');
    const [modal, setModal] = useState(false);
    const [backdrop, setBackdrop] = useState(false);

    const [btnDisable, setBtnDisable] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (email) {
                const check1 = email.includes('@');
                const check2 = email.includes('.com');

                if (check1 && check2){
                    const domain = email.slice(email.indexOf('@') + 1, email.indexOf('.com'));

                    if (domain.length > 0){
                        setEmailValidty(true);
                    }
                }
                else {
                    setEmailValidty(false);
                }
            }
        }, 1200)

        return () => clearTimeout(timer);
    }, [email])

    useEffect(() => {
        if ((email && emailValidity) && (password && passwordValidity)){
            setBtnDisable(false)
        }
        else {
            setBtnDisable(true);
        }
    }, [email, password])

    const submitFormHandler = (e) => {
        e.preventDefault();
        setSpinner(true);

        fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                email, password
            })
        }).then(res => res.json()).then(data => {
            if (data.status === 'success'){
                console.log(data);
                sessionStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = '/';
            }
            else if (data.status === 'user not found'){
                console.log(data);
                setStatus(data.status);
            }
            else if (data.status === "password doesn't match"){
                console.log(data);
                setStatus(data.status);
            }
        }).catch(err => {
            setSpinner(false);
            setStatus('error');
            setModal(true);
            setBackdrop(true);
        })
    }

    const statusDisplay = <div className={styles.statusMsgMain}>
        <h2 className={styles.statusMsgH2}>Something went wrong</h2>
        <p className={styles.statusMsgP}>Please check internet connection</p>

        <button className={styles.statusMsgBtn} onClick={() => {
            setStatus('');
            setModal(false);
            setBackdrop(false);
        }}>Ok</button>
    </div>

    
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
            {statusDisplay}
        </Modal>
        <div className={styles.loginMain}>
            <div className={styles.loginBg}>

            </div>
            <form className={styles.loginContainer}>
                <div className={styles.loginInputSection}>
                    <div className={emailValidity ? styles.loginInputContainer : `${styles.loginInputContainer} ${styles.wrongInput}`}>
                        <input type="email"
                            className={styles.loginInput}
                            placeholder="Email address"
                            onChange={(e) => setEmail(e.target.value)} />
                        <FontAwesomeIcon icon={faAt} className={styles.loginInputIcon} />
                    </div>
                    <div className={styles.errorDisplay} style={status === 'user not found' ? {backgroundColor: '#8b000054'} : {backgroundColor: 'transparent'}}>
                        <p className={styles.errorMsg} style={status === 'user not found' ? {display: 'block'} : {display: 'none'}}>User not found</p>
                    </div>
                </div>

                <div className={styles.loginInputSection}>
                    <div className={styles.loginInputContainer}>
                        <input type="password"
                            className={styles.loginInput}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)} />
                        <FontAwesomeIcon icon={faLock} className={styles.loginInputIcon} />
                    </div>
                    <div className={styles.errorDisplay} style={status === "password doesn't match" ? {backgroundColor: '#8b000054'} : {backgroundColor: 'transparent'}}>
                        <p className={styles.errorMsg} style={status === "password doesn't match" ? {display: 'block'} : {display: 'none'}}>Password doesn't match</p>
                    </div>
                </div>

                <button disabled={btnDisable}
                        className={styles.loginBtn}
                        onClick={ submitFormHandler }>Login</button>

                <Link to="/register" className={styles.registerLink}>Create Account</Link>
            </form>
        </div>
        </>
    )
}

export default Login;

