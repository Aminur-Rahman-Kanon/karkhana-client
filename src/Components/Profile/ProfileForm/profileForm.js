import React, { useEffect, useState } from 'react';
import styles from './profileForm.module.css';
import { states } from '../../../data/data';
import Modal from '../../Others/Modal/modal';
import Backdrop from '../../Others/Backdrop/backdrop';
import Spinner from '../../Others/Spinner/spinner';
import submitFormHandler from '../submitFormHandler/submitFormHanlder';
import UpdateFormHandler from '../updateFormHandler/updateFormHandler';
import OrderStatus from '../OrderStatus/orderStatus';

//In this component we got 3 different forms to update "user information", "Address", "Change password" respectively.
//And a section to display all the purchased products and their delivery status

//User can select a single form from the "profileNavbar" component at a time.

//But all forms has the "submitFormHandler" as a submit method. Since this component saves the logged in user informtaion
//to local states on componentOnMount and these local states can be chnaged with the user entered value.
//So when the "submitFormHandler" called it takes all local states(user information...) icluding a picture called "avatar"
//and submit the form. If any fields left empty then it will be an empty string ('').

//When the "submitHandlerMethod" is successfull and user click on the ok button, another fetch call will be made to
//another api endpoint to retrieve updated data and update the UI

const ProfileForm = ({formType, user}) => {
    
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [avatar, setAvatar] = useState(null);
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

    //generating an object containing user information to feed it to the submitFormHandler
    const userData = {
        firstname, lastname, email, phonenumber, avatar, state, city, address, zipcode, thana, currentpassword, newpassword
    }

    //generating an object containing user information updating methods to feed it to the submitFormHandler
    const handlerMethods = {
        setSpinner, setStatus, setBackdrop, setModal, setInvalidPassword
    }

    //if user logged in then this hook auto fill the input value of the following user information
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

    //custom onClick css effect on input
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

    //validating address form input fields and setting address form button disable/enable
    useEffect(() => {
        if (state && address && zipcode && thana){
            setAddressBtn(false);
        }
        else {
            setAddressBtn(true);
        }
    }, [state, address, zipcode, thana])

    //validating password form input fields and setting password form button disable/enable
    useEffect(() => {
        const timer = setTimeout(() => {
            currentpassword && newpassword && confirmpassword ? setPasswordBtn(false) : setPasswordBtn(true);
        }, 1200)

        return () => clearTimeout(timer);
    }, [currentpassword, newpassword, confirmpassword])

    //validating new password and confirm password
    useEffect(() => {
        const passwordTimer = setTimeout(() => {
            if (newpassword && confirmpassword){
                newpassword === confirmpassword ? setPasswordMatch(true) : setPasswordMatch(false);
            }
        }, 1200)

        return () => clearTimeout(passwordTimer);
    }, [confirmpassword, newpassword])

    //generating states options for select input
    const options = states.map((item, index) => <option key={index} value={item}>{item}</option>)

    let statusDisplay = null;

    //when update is successfull we query for updated data and render those to the UI
    if (status === 'success'){
        statusDisplay = <UpdateFormHandler email={email} updateSpinner={setSpinner} updateStatus={setStatus} />
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

    //custom onClick css effect on input elements
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

    //custom focusLeave css effect on input elements
    const focusLeave = (index) => {
        const inputDiv = document.querySelectorAll(`.${styles.profileFormItems}`);
        const selectDiv = document.querySelector(`.${styles.selectItems}`)
        const ids = document.querySelectorAll(`.${styles.profileLabel}`)
        const selectLabel = document.querySelector(`.${styles.selectLabel}`)
        const inputs = document.querySelectorAll(`.${styles.profileFormInput}`);
        const selectEl = document.getElementById('selectEl');

        if (index === 10) {
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
            {/*User information form*/}
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
                <button disabled={userInfoBtn}
                        className={styles.updateBtn}
                        onClick={ (e) => submitFormHandler(e, userData, handlerMethods) }
                        >Update</button>
            </form>
        </div>

        <div className={styles.profileMain} style={formType === 'address' ? {display: 'flex'} : {display: 'none'}}>
            {/*Address form*/}
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

                <button disabled={addressBtn} className={styles.updateBtn} onClick={ (e) => submitFormHandler(e, userData, handlerMethods) }>Update</button>
            </form>
        </div>

        <div className={styles.profileMain} style={formType === 'password' ? {display: 'flex'} : {display: 'none'}}>
            {/*Change password form*/}
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

                <button disabled={ passwordBtn && passwordMatch } className={styles.updateBtn} onClick={ (e) => submitFormHandler(e, userData, handlerMethods) }>Update</button>
            </form>
        </div>
        
        <div className={styles.profileMain} style={formType === 'orders' ? {display: 'flex'} : {display: 'none'}}>
            <div className={styles.profileFormContainer}>
                <OrderStatus orders={user !== null ? user.purchased : {}}/>
            </div>
        </div>
        </>
    )
}

export default ProfileForm;
