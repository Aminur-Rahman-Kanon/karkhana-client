import React from 'react';
import styles from './registerForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignature, faAt, faPhone, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function RegisterForm ({ status, passwordMatch, btnDisable, phoneNumberValidity, emailValidity, updateMethods }) {

    //custom onClick effect on input elements
    const focusElement = (index) => {
        const elementDiv = document.querySelectorAll(`.${styles.inputContainer}`);
        const input = document.querySelectorAll(`.${styles.input}`);
        const label = document.querySelectorAll(`.${styles.label}`);

        label.item(index).className = `${styles.label} ${styles.activeLabel}`;
        elementDiv.item(index).style.border = '1px solid white';
        input.item(index).placeholder = '';
    }

    //custom leaveFocus effect on input elements
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
        <form className={styles.resgisteFormContainer}>
            <div className={styles.inputContainer}>
                <input type="text"
                        data-testid="first-name"
                        className={styles.input}
                        placeholder="First name"
                        onChange={(e) => updateMethods.setFisrtName(e.target.value)}
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
                        onChange={(e) => updateMethods.setLastName(e.target.value)}
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
                                updateMethods.setStatus('')
                                updateMethods.setEmail(e.target.value)
                            }
                            else {
                                updateMethods.setEmail(e.target.value)
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
                        onChange={(e) => updateMethods.setPhoneNumber(e.target.value)}
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
                        onChange={(e) => updateMethods.setPassword(e.target.value)}
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
                        onChange={(e) => updateMethods.setConfirmPassword(e.target.value)}
                        onFocus={() => focusElement(5)}
                        onBlur={() => leaveFocus(5, 'Confirm Password')} />
                <FontAwesomeIcon icon={faLock} className={styles.inputIcon}/>
                <p className={styles.errorMsg} style={!passwordMatch ? {display: 'block'} : {display: 'none'}}>Password doesn't match</p>
                <div className={styles.label}>Confirm Password</div>
            </div>

            <button disabled={btnDisable} className={styles.registerBtn} onClick={ updateMethods.submitFormHandler }>Register</button>

            <div className={styles.loginPrompt}>
                <p style={{color: 'lightgray'}}>Registered Already</p>
                <Link to="/login" className={styles.loginLink}>Login</Link>
            </div>
        </form>
    )
}

export default RegisterForm;
