import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature, faAt, faPhone } from '@fortawesome/free-solid-svg-icons';
import styles from './profileForm.module.css';
import { states } from '../../../data/data';
import Modal from '../../Others/Modal/modal';
import Backdrop from '../../Others/Backdrop/backdrop';
import Spinner from '../../Others/Spinner/spinner';


const ProfileForm = ({formType}) => {
    
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [imgLink, setImgLink] = useState('');
    const [avatarValidity, setAvatarValidity] = useState(true);
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [thana, setThana] = useState('');
    const [currentpassword, setCurrentpassword] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');

    const [userInfoBtn, setUserInfoBtn] = useState(false);
    const [addressBtn, setAddressBtn] = useState(true);
    const [passwordBtn, setPasswordBtn] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [status, setStatus] = useState('');

    const [modal, setModal] = useState(false);
    const [backdrop, setBackdrop] = useState(false);
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        if (Object.keys(sessionStorage).length > 0){
            if (sessionStorage.key(0) === 'user'){
                const user = JSON.parse(sessionStorage.getItem('user'));
                setFirstname(user.firstName);
                setLastname(user.lastName);
                setEmail(user.email);
                setPhonenumber(user.phoneNumber)
                setState(user.state);
                setCity(user.city);
                setAddress(user.address);
                setZipcode(user.zipcode);
                setThana(user.thana);
                document.getElementById('state').value = user.state || "Select State";
            }
        }
    }, [])

    useEffect(() => {
        if (state && city && address && zipcode && thana){
            setAddressBtn(false);
        }
        else {
            setAddressBtn(true);
        }
    }, [state,  city, address, zipcode, thana])

    useEffect(() => {
        const timer = setTimeout(() => {
            currentpassword && newpassword && confirmpassword ? setPasswordBtn(false) : setPasswordBtn(true);
        }, 1200)

        return () => clearTimeout(timer);
    }, [currentpassword, newpassword, confirmpassword])

    useEffect(() => {
        const passwordTimer = setTimeout(() => {
            if (newpassword && confirmpassword){
                newpassword === confirmpassword ? setPasswordMatch(true) : setPasswordMatch(false);
            }
        }, 1200)

        return () => clearTimeout(passwordTimer);
    }, [confirmpassword, newpassword])

    useEffect(() => {
        if (avatar){
            if (avatar.name.split('.').at(-1) === 'jpg' || avatar.name.split('.').at(-1) === 'jpeg'){
                const ext = avatar.name.split('.').at(-1);
                setAvatarValidity(true);
                setImgLink(`https://karkhana-server.onrender.com/Users/${email}.${ext}`);
                // setImgLink(`http://localhost:8000/assets/users/${email}.${ext}`);
                setUserInfoBtn(false);
            }
            else {
                setAvatarValidity(false);
                setUserInfoBtn(true);
            }
        }
    }, [avatar])

    const submitFormHandler = async(e) => {
        e.preventDefault();
        setSpinner(true);

        const userData = {
            firstname, lastname, email, phonenumber, imgLink, state, city, address, zipcode, thana, currentpassword, newpassword
        }

        const formData = new FormData();

        formData.append('avatar', avatar)
        formData.append("data", JSON.stringify(userData))

        
        await fetch('https://karkhana-server.onrender.com/update-profile', {
            method: 'POST',
            body: formData
        }).then(res => res.json()).then(data => {
            console.log(data);
            if (data.status === 'success'){
                setSpinner(false);
                setStatus(data.status);
                setBackdrop(true);
                setModal(true);
            }
            else if (data.status === 'invalid password'){
                setSpinner(false);
                setInvalidPassword(true);
            }
            else if (data.status === 'file upload error'){
                setSpinner(false);
                setStatus(data.status);
                setBackdrop(true);
                setModal(true);
            }
            else {
                setSpinner(false);
                setStatus('error');
                setBackdrop(true);
                setModal(true);
            }
        }).catch(err => {
            setSpinner(false);
            setStatus('error')
        })
    }

    const options = states.map((item, index) => <option key={index} value={item}>{item}</option>)

    let statusDisplay = null;

    if (status === 'success'){
        statusDisplay = <div className={styles.statusDisplayMain}>
            <h2 className={styles.statusDisplayH2}>Update Completed</h2>
            <button className={styles.statusDisplayBtn} onClick={async () => {
                await fetch('https://karkhana-server.onrender.com/redirect-user', {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({ email })
                }).then(res => res.json()).then(data => {
                    if (data.status === 'success'){
                        sessionStorage.setItem('user', JSON.stringify(data.user));
                        window.location.reload();
                    }
                    else {
                        setStatus('error');
                    }
                })
            }}>Ok</button>
        </div>
    }
    else {
        statusDisplay = <div className={styles.statusDisplayMain}>
            <h2 className={styles.statusMsgH2}>Something went wrong</h2>
            <p className={styles.statusMshP}>Please try again</p>
            <button className={styles.statusDisplayBtn} onClick={() => {
                setStatus('');
                setBackdrop(false);
                setModal(false);
            }}>Ok</button>
        </div>
    }

    return (
        <>
        <Spinner spinner={spinner} />
        <Backdrop backdrop={backdrop} />
        <Modal modal={modal}>
            {statusDisplay}
        </Modal>
        <div className={styles.profileMain} style={formType === 'user information' ? {display: 'flex'}: {display: 'none'}}>
            <form className={styles.profileFormContainer} encType="multipart/form-data">
                <div className={styles.profileFormItems}>
                    <input type="text"
                            className={styles.profileFormInput}
                            placeholder="First name"
                            defaultValue={firstname}
                            onChange={(e) => setFirstname(e.target.value)}/>
                    <FontAwesomeIcon icon={faSignature} className={styles.profileFormIcon}/>
                </div>
                <div className={styles.profileFormItems}>
                    <input type="text"
                            className={styles.profileFormInput}
                            placeholder="Last name"
                            defaultValue={lastname}
                            onChange={(e) => setLastname(e.target.value)}/>
                    <FontAwesomeIcon icon={faSignature} className={styles.profileFormIcon}/>
                </div>
                <div className={styles.profileFormItems}>
                    <input type="email"
                            className={styles.profileFormInput}
                            placeholder="Email"
                            defaultValue={email}
                            disabled
                            />
                    <FontAwesomeIcon icon={faAt} className={styles.profileFormIcon}/>
                </div>
                <div className={styles.profileFormItems}>
                    <input type="number"
                            className={styles.profileFormInput}
                            placeholder="Phone number"
                            defaultValue={phonenumber}
                            onChange={(e) => setPhonenumber(e.target.value)}/>
                    <FontAwesomeIcon icon={faPhone} className={styles.profileFormIcon}/>
                </div>

                <div className={ avatarValidity ? styles.profileFormFileInput : `${styles.profileFormFileInput} ${styles.wrongFileInput}`}>
                    <input type="file" name="avatar" className={styles.fileInput} onChange={(e) => setAvatar(e.target.files[0])}/>
                    <p style={avatarValidity ? {display: 'none'} : {display: 'block'}} className={styles.imgError}>Only jpg and jpeg are allowed</p>
                </div>
                <button disabled={userInfoBtn} className={styles.updateBtn} onClick={ submitFormHandler }>Update</button>
            </form>
        </div>

        <div className={styles.profileMain} style={formType === 'address' ? {display: 'flex'} : {display: 'none'}}>
            <form className={styles.profileFormContainer} encType="multipart/form-data">
                <select defaultValue="Select State"
                        className={styles.selectInput}
                        id="state"
                        onChange={(e) => setState(e.target.value)}>
                    <option disabled>Select State</option>
                    {options}
                </select>
                <div className={styles.profileFormItems}>
                    <input type="text"
                            className={styles.profileFormInput}
                            placeholder="City"
                            defaultValue={city}
                            onChange={(e) => setCity(e.target.value)}
                            />
                </div>
                <div className={styles.profileFormItems}>
                    <input type="text"
                            className={styles.profileFormInput}
                            placeholder="Address"
                            defaultValue={address}
                            onChange={(e) => setAddress(e.target.value)}
                            />
                </div>
                <div className={styles.profileFormItems}>
                    <input type="text"
                            className={styles.profileFormInput}
                            placeholder="Zip / Postal code"
                            defaultValue={zipcode}
                            onChange={(e) => setZipcode(e.target.value)}
                            />
                </div>

                <div className={styles.profileFormItems}>
                    <input type="text"
                            className={styles.profileFormInput}
                            placeholder="Thana"
                            defaultValue={thana}
                            onChange={(e) => setThana(e.target.value)}
                            />
                </div>

                <button disabled={addressBtn} className={styles.updateBtn} onClick={ submitFormHandler }>Update</button>
            </form>
        </div>

        <div className={styles.profileMain} style={formType === 'password' ? {display: 'flex'} : {display: 'none'}}>
            <form className={styles.profileFormContainer} encType="multipart/form-data">
                <div className={styles.profileFormItems}>
                    <input type="password"
                            className={styles.profileFormInput}
                            placeholder="Current Password"
                            onChange={(e) => setCurrentpassword(e.target.value)}/>
                </div>
                <div className={styles.profileFormItems}>
                    <input type="password"
                            className={styles.profileFormInput}
                            placeholder="New Password"
                            onChange={(e) => setNewpassword(e.target.value)}/>
                </div>
                <div className={styles.profileFormItems}>
                    <input type="password"
                            className={styles.profileFormInput}
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmpassword(e.target.value)}/>
                    <p style={ passwordMatch ? {display: 'none'} : {display: 'block'}} className={styles.passwordMatch}>Password doesn't match</p>
                    <p style={ invalidPassword ? {display: 'block'}: {display:'none'} } className={styles.passwordMatch}>Current password is invalid</p>
                </div>

                <button disabled={ passwordBtn && passwordMatch } className={styles.updateBtn} onClick={ submitFormHandler }>Update</button>
            </form>
        </div>
        </>
    )
}

export default ProfileForm;