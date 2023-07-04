import React from "react";
import styles from './profileAvatar.module.css';
import user from '../../../Assets/Products/AdditionalDetails/avatar.png';

const ProfileAvatar = ({userObj}) => {
    return (
        <div className={styles.profileAvatarContainer}>
            <div className={styles.avatarContainer}>
                <img src={userObj ? userObj.imgLink : user} alt="karkhana user" className={styles.avatar}/>
            </div>
            <div className={styles.profileInfoContainer}>
                <h3 className={styles.profileInfoH3}>Name: {userObj ?`${userObj.firstName} ${userObj.lastName}` : 'No information'}</h3>
            </div>
        </div>
    )
}

export default ProfileAvatar;
