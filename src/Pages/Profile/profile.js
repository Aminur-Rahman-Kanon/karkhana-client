import React, { useEffect, useState } from "react";
import styles from './profile.module.css';
import user from '../../Assets/avatar.png';
import ProfileForm from "./profileForm/profileForm";

const Profile = () => {

    const [formType, setFormTYpe] = useState('user information');

    const [img, setImg] = useState('');

    const [name, setName] = useState('');

    const userObj = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;

    if (userObj){
        const userName = `${userObj.firstName} ${userObj.lastName}`
        if (!name){
            setName(userName);
        }
        if (!img){
            setImg(userObj.imgLink);
        }
    }

    return (
        <div className={styles.profileMain}>
            <div className={styles.profileContainer}>
                <h1 className={styles.profileHeader}>Update Profile</h1>
                <div className={styles.profileSection}>
                    <div className={styles.profileAvatarContainer}>
                        <div className={styles.avatarContainer}>
                            <img src={img || user} alt="karkhana user" className={styles.avatar}/>
                        </div>
                        <div className={styles.profileInfoContainer}>
                            <h3 className={styles.profileInfoH3}>Name: {name || 'No information'}</h3>
                            <div className={styles.categoryContainer}>
                                <p className={styles.profileInfoP}>Category: Home</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.profileSettings}>
                        <div className={styles.profileSettingsNavContainer}>
                            <button className={formType === 'user information' ? styles.profileSettingsBtn : `${styles.profileSettingsBtn} ${styles.profileSettingsBtnInactive}`}
                                    onClick={() => setFormTYpe('user information')}>User Information</button>
                            <button className={formType === 'address' ? styles.profileSettingsBtn : `${styles.profileSettingsBtn} ${styles.profileSettingsBtnInactive}`}
                                    onClick={() => setFormTYpe('address')}>Address</button>
                            <button className={formType === 'password' ? styles.profileSettingsBtn : `${styles.profileSettingsBtn} ${styles.profileSettingsBtnInactive}`}
                                    onClick={() => setFormTYpe('password')}>Change Password</button>
                            <button className={formType === 'orders' ? styles.profileSettingsBtn : `${styles.profileSettingsBtn} ${styles.profileSettingsBtnInactive}`}
                                    onClick={() => setFormTYpe('orders')}>Orders</button>
                        </div>
                        <ProfileForm formType={formType} user={userObj} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
