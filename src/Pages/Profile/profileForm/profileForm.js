import React, { useEffect, useRef, useState } from 'react';
import styles from './profileForm.module.css';
import { states } from '../../../data/data';
import Modal from '../../Others/Modal/modal';
import Backdrop from '../../Others/Backdrop/backdrop';
import Spinner from '../../Others/Spinner/spinner';


const ProfileForm = ({formType, user}) => {
    
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
        if (user){
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
            document.getElementById('selectEl').value = user.state || "Select State";
        }
    }, []);

    useEffect(() => {
        const ids = document.querySelectorAll(`.${styles.profileLabel}`)
        const items = document.querySelectorAll(`.${styles.profileFormInput}`);
        const selectLabel = document.getElementById('selectLabel')
        const selectInput = document.querySelector(`.${styles.selectInput}`)
        
        items.forEach((item, index) => {
            if (item.value){
                return ids[index]['className'] = `${styles.profileLabel} ${styles.activeLabel}`
            }
        })

        if (state){
            selectLabel.className = `${styles.selectLabel} ${styles.activeLabel}`
        }
    }, [firstname, lastname, email, phonenumber, state, address, zipcode, thana])


    useEffect(() => {
        if (state && address && zipcode && thana){
            setAddressBtn(false);
        }
        else {
            setAddressBtn(true);
        }
    }, [state, address, zipcode, thana])

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
                setImgLink(`https://karkhana-server.onrender.com/assets/users/${email}.${ext}`);
                setUserInfoBtn(false);
            }
            else {
                setAvatarValidity(false);
                setUserInfoBtn(true);
            }
        }
    }, [avatar]);

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

    const focusEnter = (index) => {
        const inputDiv = document.querySelectorAll(`.${styles.profileFormItems}`);
        const selectDiv = document.querySelector(`.${styles.selectItems}`)
        const ids = document.querySelectorAll(`.${styles.profileLabel}`)
        const selectEl = document.getElementById('selectLabel')

        if (index === 10){
            selectEl.className = `${styles.selectLabel} ${styles.activeLabel}`;
            selectDiv.style.border = '1px solid #ad6c4d'
        }
        else {
            ids.item(index).className = `${styles.profileLabel} ${styles.activeLabel}`;
            inputDiv[index].style.border = '1px solid #ad6c4d'
        }
    }

    const focusLeave = (index) => {
        const inputDiv = document.querySelectorAll(`.${styles.profileFormItems}`);
        const selectDiv = document.querySelector(`.${styles.selectItems}`)
        const ids = document.querySelectorAll(`.${styles.profileLabel}`)
        const selectLabel = document.querySelector(`.${styles.selectLabel}`)
        const inputs = document.querySelectorAll(`.${styles.profileFormInput}`);
        const selectEl = document.getElementById('selectEl');

        if (index === 10) {
            console.log(index);
            if (selectEl.value === "Select State" || selectEl.value === null) {
                selectLabel.className = `${styles.selectLabel} ${styles.inActiveLabel}`;
            }
            selectDiv.style.border = '1px solid lightgray';
            
        }
        else {
            if (inputs.item(index).value === "" || inputs.item(index).value === null) {
                ids.item(index).className = `${styles.profileLabel} ${styles.inActiveLabel}`;
            }
            inputDiv[index].style.border = '1px solid lightgray'
        }

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
                            onChange={(e) => setFirstname(e.target.value)}
                            onFocus={() => focusEnter(0)}
                            onBlur={() => focusLeave(0)}/>
                    <div className={styles.profileLabel} id='label'>First Name</div>
                </div>
                <div className={styles.profileFormItems}>
                    <input type="text"
                            className={styles.profileFormInput}
                            placeholder="Last name"
                            defaultValue={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            onFocus={() => focusEnter(1)}
                            onBlur={() => focusLeave(1)}/>
                    <div className={styles.profileLabel} id='label'>Last Name</div>
                </div>
                <div className={styles.profileFormItems}>
                    <input type="email"
                            className={styles.profileFormInput}
                            placeholder="Email"
                            defaultValue={email}
                            onFocus={() => focusEnter(2)}
                            onBlur={() => focusLeave(2)}
                            disabled
                            />
                    <div className={styles.profileLabel} id='label'>Email</div>
                </div>
                <div className={styles.profileFormItems}>
                    <input type="number"
                            className={styles.profileFormInput}
                            placeholder="Phone number"
                            defaultValue={phonenumber}
                            onChange={(e) => setPhonenumber(e.target.value)}
                            onFocus={() => focusEnter(3)}
                            onBlur={() => focusLeave(3)}/>
                    <div className={styles.profileLabel} id='label'>Phone</div>
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
                <div className={styles.selectItems}>
                    <select defaultValue="Select State"
                            className={styles.selectInput}
                            id="selectEl"
                            onChange={(e) => setState(e.target.value)}
                            onFocus={() => focusEnter(10)}
                            onBlur={() => focusLeave(10)}>
                        <option disabled>Select State</option>
                        {options}
                    </select>
                    <div className={styles.selectLabel} id='selectLabel'>State</div>
                </div>
                <div className={styles.profileFormItems}>
                    <input type="text"
                            className={styles.profileFormInput}
                            placeholder="Street"
                            defaultValue={address}
                            onChange={(e) => setAddress(e.target.value)}
                            onFocus={() => focusEnter(4)}
                            onBlur={() => focusLeave(4)}/>
                    <div className={styles.profileLabel} id='label'>Street</div>
                </div>
                <div className={styles.profileFormItems}>
                    <input type="text"
                            className={styles.profileFormInput}
                            placeholder="Zip / Postal code"
                            defaultValue={zipcode}
                            onChange={(e) => setZipcode(e.target.value)}
                            onFocus={() => focusEnter(5)}
                            onBlur={() => focusLeave(5)}/>
                    <div className={styles.profileLabel} id='label'>Zip / Postal code</div>
                </div>

                <div className={styles.profileFormItems}>
                    <input type="text"
                            className={styles.profileFormInput}
                            placeholder="Thana"
                            defaultValue={thana}
                            onChange={(e) => setThana(e.target.value)}
                            onFocus={() => focusEnter(6)}
                            onBlur={() => focusLeave(6)}/>
                    <div className={styles.profileLabel} id='label'>Thana</div>
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
                            onChange={(e) => setCurrentpassword(e.target.value)}
                            onFocus={() => focusEnter(7)}
                            onBlur={() => focusLeave(7)}/>
                    <div className={styles.profileLabel} id='label'>Current Password</div>
                </div>
                <div className={styles.profileFormItems}>
                    <input type="password"
                            className={styles.profileFormInput}
                            placeholder="New Password"
                            onChange={(e) => setNewpassword(e.target.value)}
                            onFocus={() => focusEnter(8)}
                            onBlur={() => focusLeave(8)}/>
                    <div className={styles.profileLabel} id='label'>New Password</div>
                </div>
                <div className={styles.profileFormItems}>
                    <input type="password"
                            className={styles.profileFormInput}
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmpassword(e.target.value)}
                            onFocus={() => focusEnter(9)}
                            onBlur={() => focusLeave(9)}/>
                    <p style={ passwordMatch ? {display: 'none'} : {display: 'block'}} className={styles.passwordMatch}>Password doesn't match</p>
                    <p style={ invalidPassword ? {display: 'block'}: {display:'none'} } className={styles.passwordMatch}>Current password is invalid</p>
                    <div className={styles.profileLabel} id='label'>Confirm Password</div>
                </div>

                <button disabled={ passwordBtn && passwordMatch } className={styles.updateBtn} onClick={ submitFormHandler }>Update</button>
            </form>
        </div>
        
        <div className={styles.profileMain} style={formType === 'orders' ? {display: 'flex'} : {display: 'none'}}>
            <h3 className={styles.header3}>You dont have any orders</h3>
        </div>
        </>
    )
}

export default ProfileForm;