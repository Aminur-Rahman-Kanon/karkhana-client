import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faAt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import styles from './login.module.css';
import Backdrop from "../Others/Backdrop/backdrop";
import Modal from "../Others/Modal/modal";
import { Link } from "react-router-dom";
import Spinner from "../Others/Spinner/spinner";

const Login = () => {

    const navigate = useNavigate()

    const [email ,setEmail] = useState('');
    const [emailValidity, setEmailValidty] = useState(true);

    const [password, setPassword] = useState('');
    const [passwordValidity, setPasswordValidity] = useState(true);

    const [spinner, setSpinner] = useState(false);
    const [status, setStatus] = useState('');
    const [modal, setModal] = useState(false);
    const [backdrop, setBackdrop] = useState(false);

    const [btnDisable, setBtnDisable] = useState(true);

    const user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;
    

    useEffect(() => {
        window.scrollTo(0, 0);
        if (user) return navigate('/');
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

        fetch('https://karkhana-server.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                email, password
            })
        }).then(res => res.json()).then(data => {
            if (data.status === 'success'){
                sessionStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = '/';
            }
            else if (data.status === 'user not found'){
                setSpinner(false);
                setStatus(data.status);
            }
            else if (data.status === "password doesn't match"){
                setSpinner(false);
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

    const focusElement = (index) => {
        const input = document.querySelectorAll(`.${styles.loginInput}`);
        const elementDiv = document.querySelectorAll(`.${styles.loginInputContainer}`);
        const label = document.querySelectorAll(`.${styles.inputLabel}`);

        elementDiv.item(index).style.border = '1px solid white';
        label.item(index).className = `${styles.inputLabel} ${styles.activeLabel}`;
        input.item(index).placeholder = '';
    }


    const leaveFocus = (index) => {
        const input = document.querySelectorAll(`.${styles.loginInput}`);
        const elementDiv = document.querySelectorAll(`.${styles.loginInputContainer}`);
        const label = document.querySelectorAll(`.${styles.inputLabel}`);

        if (input.item(index).value === '' || input.item(index).value === null){
            elementDiv.item(index).style.border = '1px solid #b3b3b3'
            label.item(index).className = `${styles.inputLabel} ${styles.inActiveLabel}`;
            index === 0 ? input.item(index).placeholder = 'Email Address' : input.item(index).placeholder = "Password";
        }
    }
    
    return (
        <>
        <Spinner spinner={spinner}/>
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
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => focusElement(0)}
                            onBlur={() => leaveFocus(0)} />
                        <FontAwesomeIcon icon={faAt} className={styles.loginInputIcon} />
                    </div>
                    <div className={styles.errorDisplay} style={status === 'user not found' ? {backgroundColor: '#8b000054'} : {backgroundColor: 'transparent'}}>
                        <p className={styles.errorMsg} style={status === 'user not found' ? {display: 'block'} : {display: 'none'}}>User not found</p>
                    </div>
                    <div className={styles.inputLabel}>Email Address</div>
                </div>

                <div className={styles.loginInputSection}>
                    <div className={styles.loginInputContainer}>
                        <input type="password"
                            className={styles.loginInput}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => focusElement(1)}
                            onBlur={() => leaveFocus(1)} />
                        <FontAwesomeIcon icon={faLock} className={styles.loginInputIcon} />
                    </div>
                    <div className={styles.errorDisplay} style={status === "password doesn't match" ? {backgroundColor: '#8b000054'} : {backgroundColor: 'transparent'}}>
                        <p className={styles.errorMsg} style={status === "password doesn't match" ? {display: 'block'} : {display: 'none'}}>Password doesn't match</p>
                    </div>
                    <div className={styles.inputLabel}>Password</div>
                </div>

                <button disabled={btnDisable}
                        className={styles.loginBtn}
                        onClick={ submitFormHandler }>Login</button>

                <div className={styles.otherLoginOptions}>OR LOGIN WITH</div>

                <div className={styles.otherLogin}>
                    <Link to="" className={styles.otherLoginLink}>
                        <FontAwesomeIcon icon={faFacebook} className={styles.otherLoginIcon}/>
                    </Link>
                    <Link to="" className={styles.otherLoginLink}>
                        <FontAwesomeIcon icon={faGoogle} className={styles.otherLoginIcon}/>
                    </Link>
                </div>

                <div className={styles.otherOption}>
                    <Link to="/register" className={styles.registerLink}>Create Account</Link>
                    <Link to="/forgot-password" className={styles.registerLink}>Forgot Password ?</Link>
                </div>

            </form>
        </div>
        </>
    )
}

export default Login;

