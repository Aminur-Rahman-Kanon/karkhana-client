import React from 'react';
import styles from './profileNavbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLocationDot, faShieldHalved, faCube } from '@fortawesome/free-solid-svg-icons';

function ProfileNavbar ({ formType, changeFormType }) {
    return (
        <div className={styles.profileSettingsNavContainer}>
            <div className={formType === 'user information' ? styles.profileSettingsBtn : `${styles.profileSettingsBtn} ${styles.profileSettingsBtnInactive}`}
                    onClick={() => changeFormType('user information')}>
                        <span className={styles.btn}>User Information</span>
                        <FontAwesomeIcon icon={faUser} className={styles.profileSettingsBtnIcon}/>
                    </div>
            <div className={formType === 'address' ? styles.profileSettingsBtn : `${styles.profileSettingsBtn} ${styles.profileSettingsBtnInactive}`}
                    onClick={() => changeFormType('address')}>
                        <span className={styles.btn}>Address</span>
                        <FontAwesomeIcon icon={faLocationDot} className={styles.profileSettingsBtnIcon}/>
                    </div>
            <div className={formType === 'password' ? styles.profileSettingsBtn : `${styles.profileSettingsBtn} ${styles.profileSettingsBtnInactive}`}
                    onClick={() => changeFormType('password')}>
                        <span className={styles.btn}>Change Password</span>
                        <FontAwesomeIcon icon={faShieldHalved} className={styles.profileSettingsBtnIcon}/>
                    </div>
            <div className={formType === 'orders' ? styles.profileSettingsBtn : `${styles.profileSettingsBtn} ${styles.profileSettingsBtnInactive}`}
                    onClick={() => changeFormType('orders')}>
                        <span className={styles.btn}>Orders</span>
                        <FontAwesomeIcon icon={faCube} className={styles.profileSettingsBtnIcon}/>
                    </div>
        </div>
    )
}

export default ProfileNavbar;
