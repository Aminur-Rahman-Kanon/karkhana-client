import React from 'react';
import styles from './updateFormHandler.module.css';

//This component make a fetch call to 'redirect-user' api to get the updated user information to
//render those to the UI so user can see the changes been made.

function UpdateFormHandler ({ email, updateSpinner, updateStatus }) {
  return (
    <div className={styles.statusDisplayMain}>
        <h2 className={styles.statusDisplayH2}>Update Completed</h2>
        <button className={styles.statusDisplayBtn} onClick={async () => {
            updateSpinner(true);
            await fetch('https://karkhana-server.onrender.com/redirect-user', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ email })
            }).then(res => res.json()).then(data => {
                if (data.status === 'success'){
                    updateSpinner(false);
                    sessionStorage.setItem('user', JSON.stringify(data.user));
                    window.location.reload();
                }
                else {
                    updateSpinner(false);
                    updateStatus('error');
                }
            })
        }}>Ok</button>
    </div>
  )
}

export default UpdateFormHandler;
