import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './profileMain.module.css';
import ProfileForm from "../ProfileForm/profileForm";
import ProfileNavbar from "../profileNavbar/profileNavbar";
import ProfileAvatar from "../ProfileAvatar/profileAvatar";

const ProfileMain = () => {

    const navigate = useNavigate();

    const [formType, setFormTYpe] = useState('user information');

    const userObj = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {};

    //if user not logged in then we redirect to the homepage
    useEffect(() => {
        window.scrollTo(0, 0);
        if (!userObj.firstName) return navigate('/');
    }, [])

    return (
        <div className={styles.profileMain}>
            <div className={styles.profileContainer}>
                <h1 className={styles.profileHeader}>Update Profile</h1>
                <div className={styles.profileSection}>
                    {/*displaying user photo or default avatar */}
                    <ProfileAvatar userObj={userObj} />
                    <div className={styles.profileSettings}>
                        {/*displaying form navbar */}
                        <ProfileNavbar formType={formType} changeFormType={setFormTYpe}/>
                        {/*displaying form*/}
                        <ProfileForm formType={formType} user={userObj} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileMain;
