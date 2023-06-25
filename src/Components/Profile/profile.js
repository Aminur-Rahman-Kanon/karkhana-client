import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './profile.module.css';
import user from '../../Assets/avatar.png';
import ProfileForm from "./profileForm/profileForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLocationDot, faShieldHalved, faCube } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {

    const navigate = useNavigate();

    const [formType, setFormTYpe] = useState('user information');

    const userObj = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!userObj) return navigate('/');
    }, [])


    return (
        <div className={styles.profileMain}>
            <div className={styles.profileContainer}>
                <h1 className={styles.profileHeader}>Update Profile</h1>
                <div className={styles.profileSection}>
                    <div className={styles.profileAvatarContainer}>
                        <div className={styles.avatarContainer}>
                            <img src={userObj ? userObj.imgLink : user} alt="karkhana user" className={styles.avatar}/>
                        </div>
                        <div className={styles.profileInfoContainer}>
                            <h3 className={styles.profileInfoH3}>Name: {userObj ?`${userObj.firstName} ${userObj.lastName}` : 'No information'}</h3>
                        </div>
                    </div>

                    <div className={styles.profileSettings}>
                        <div className={styles.profileSettingsNavContainer}>
                            <div className={formType === 'user information' ? styles.profileSettingsBtn : `${styles.profileSettingsBtn} ${styles.profileSettingsBtnInactive}`}
                                    onClick={() => setFormTYpe('user information')}>
                                        <span className={styles.btn}>User Information</span>
                                        <FontAwesomeIcon icon={faUser} className={styles.profileSettingsBtnIcon}/>
                                    </div>
                            <div className={formType === 'address' ? styles.profileSettingsBtn : `${styles.profileSettingsBtn} ${styles.profileSettingsBtnInactive}`}
                                    onClick={() => setFormTYpe('address')}>
                                        <span className={styles.btn}>Address</span>
                                        <FontAwesomeIcon icon={faLocationDot} className={styles.profileSettingsBtnIcon}/>
                                    </div>
                            <div className={formType === 'password' ? styles.profileSettingsBtn : `${styles.profileSettingsBtn} ${styles.profileSettingsBtnInactive}`}
                                    onClick={() => setFormTYpe('password')}>
                                        <span className={styles.btn}>Change Password</span>
                                        <FontAwesomeIcon icon={faShieldHalved} className={styles.profileSettingsBtnIcon}/>
                                    </div>
                            <div className={formType === 'orders' ? styles.profileSettingsBtn : `${styles.profileSettingsBtn} ${styles.profileSettingsBtnInactive}`}
                                    onClick={() => setFormTYpe('orders')}>
                                        <span className={styles.btn}>Orders</span>
                                        <FontAwesomeIcon icon={faCube} className={styles.profileSettingsBtnIcon}/>
                                    </div>
                        </div>
                        <ProfileForm formType={formType} user={userObj} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
