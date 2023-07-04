import React from 'react';
import styles from './displayMessage.module.css';

export const NetworkError = ({closeModal}) => {
    return (
        <div className={styles.displayMsgContainer}>
            <h2 className={styles.messageH2}>Something went wrong</h2>
            <p className={styles.messageP}>Please try again or check internet connection</p>
            <button className={styles.displayStatusBtn} onClick={closeModal}>Ok</button>
        </div>
    )
}

export const ForgotPasswordHandlerMessage = ({ status, buttonHandler }) => {

    let displayStatus = null;

    if (status === 'success'){
        displayStatus = <div className={styles.displayMsgContainer}>
            <h2 className={styles.messageH2}>A link has been sent to your email</h2>
            <p className={styles.messageP}>PLease follow the instruction to reset your password and dont forget to check the spam folder id you can't find the email</p>
            <button className={styles.displayStatusBtn} onClick={() => window.location.href = '/login'}>Ok</button>
        </div>
    }
    else if (status === 'user not found') {
        displayStatus = <div className={styles.displayMsgContainer}>
            <h2 className={styles.messageH2}>User not found</h2>
            <p className={styles.messageP}>Please make sure you are registered  with us</p>
            <button className={styles.displayStatusBtn} onClick={buttonHandler}>Ok</button>
        </div>
    }
    else {
        displayStatus = <div className={styles.displayMsgContainer}>
            <h2 className={styles.messageH2}>Something went wrong</h2>
            <p className={styles.messageP}>Please try again</p>
            <button className={styles.displayStatusBtn} onClick={buttonHandler}>Ok</button>
        </div>
    }

    return displayStatus;
}

export const RegisterHandlerMessage = ({status, buttonHandler}) => {
    let displayStatusMsg = null;

    if (status === 'success'){
        displayStatusMsg = <div className={styles.displayMsgContainer}>
            <h2 className={styles.messageH2}>User registered</h2>
            <p className={styles.messageP}>Thank you for joining us</p>
            <button className={styles.displayStatusBtn} onClick={() => window.location.href = '/login'}>Ok</button>
        </div>
    }
    else if (status === 'error'){
        displayStatusMsg = <div className={styles.displayMsgContainer}>
            <h2 className={styles.messageH2}>Something went wrong</h2>
            <p className={styles.messageP}>Please try again</p>
            <button className={styles.displayStatusBtn} onClick={buttonHandler}>Ok</button>
        </div>
    }

    return displayStatusMsg;
}

export const PaymentHandlerMessage = ({status, responseHandler}) => {
    if (status === 'success') {
        return (
            <div className={styles.displayMsgContainer}>
                <h2 className={styles.messageH2}>Payment Successful</h2>
                <p className={styles.messageP}>We have sent an email with your order details</p>
                <button className={styles.displayStatusBtn} onClick={responseHandler.successResponseHandler}>Ok</button>
            </div>
        )
    }
    else if (status === 'payment failed') {
        return (
            <div className={styles.displayMsgContainer}>
                <h2 className={styles.messageH2}>Payment failed</h2>
                <p className={styles.messageP}>Please check your credentials and try again</p>
                <p className={styles.messageP}>This event was logged to the server. Contact with us if any issues</p>
                <button className={styles.displayStatusBtn} onClick={responseHandler.otherMessageHandler}>Ok</button>
            </div>
        )
    }
    else {
        return (
            <div className={styles.displayMsgContainer}>
                <h2 className={styles.messageH2}>Something went wrong</h2>
                <p className={styles.messageP}>Please try again or contact admin</p>
                <button className={styles.displayStatusBtn} onClick={responseHandler.otherMessageHandler}>Ok</button>
            </div>
        )
    }
}