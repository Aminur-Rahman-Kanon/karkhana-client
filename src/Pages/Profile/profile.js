import React from "react";
import styles from './profile.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLocationDot, faReceipt, faShieldHalved } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {

    return (
        <div className={styles.profileMain}>
            <div className={styles.prifleNavMain}>
                <div className={styles.profileNavItem}>
                    <FontAwesomeIcon icon={faUser} className={styles.profileIcon}/>
                    <p className={styles.profileNavP}>User Info</p>
                </div>
                <div className={styles.profileNavItem}>
                    <FontAwesomeIcon icon={faLocationDot} className={styles.profileIcon}/>
                    <p className={styles.profileNavP}>addresses</p>
                </div><div className={styles.profileNavItem}>
                    <FontAwesomeIcon icon={faReceipt} className={styles.profileIcon}/>
                    <p className={styles.profileNavP}>Orders</p>
                </div><div className={styles.profileNavItem}>
                    <FontAwesomeIcon icon={faShieldHalved} className={styles.profileIcon}/>
                    <p className={styles.profileNavP}>Change Password</p>
                </div>
            </div>
            <div className={styles.profileNavDisplay}>
                <div className={styles.userProfile}>
                    <div className={styles.avatarContainer}>
                        <img src="" alt="profile" className={styles.avatar}/>
                    </div>
                    <div className={styles.userProfileDetails}>
                        <div className={styles.userProfileDetailsItem}>
                            <label>First name:</label>
                            <input type="text" className={styles.userProfileInput} />
                        </div>
                        <div className={styles.userProfileDetailsItem}>
                            <label>Last name:</label>
                            <input type="text" className={styles.userProfileInput} />
                        </div>
                        <div className={styles.userProfileDetailsItem}>
                            <label>Email:</label>
                            <input type="email" className={styles.userProfileInput} />
                        </div>
                        <div className={styles.userProfileDetailsItem}>
                            <label>Phone Number:</label>
                            <input type="number" className={styles.userProfileInput} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
