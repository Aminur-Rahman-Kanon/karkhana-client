//This method make a fetch call with a formData including all the data that user changes
//and a picture as "avatar" that user selects. This method is available in all 3 forms as a submit handlers

export default async function submitFormHandler ( e, userData, handlerMethods ) {
    e.preventDefault();
    handlerMethods.setSpinner(true);

    const formData = new FormData();

    formData.append('avatar', userData.avatar);
    formData.append("data", JSON.stringify(userData));

    
    await fetch('https://karkhana-server.onrender.com/update-profile', {
        method: 'POST',
        body: formData
    }).then(res => res.json()).then(data => {
        if (data.status === 'success'){
            handlerMethods.setSpinner(false);
            handlerMethods.setStatus(data.status);
            handlerMethods.setBackdrop(true);
            handlerMethods.setModal(true);
        }
        else if (data.status === 'invalid password'){
            handlerMethods.setSpinner(false);
            handlerMethods.setInvalidPassword(true);
        }
        else if (data.status === 'file upload error'){
            handlerMethods.setSpinner(false);
            handlerMethods.setStatus(data.status);
            handlerMethods.setBackdrop(true);
            handlerMethods.setModal(true);
        }
        else {
            handlerMethods.setSpinner(false);
            handlerMethods.setStatus('error');
            handlerMethods.setBackdrop(true);
            handlerMethods.setModal(true);
        }
    }).catch(err => {
        handlerMethods.setSpinner(false);
        handlerMethods.setStatus('error');
    })
}
