import React from "react";

const Backdrop = ({backdrop, toggleBackdrop}) => {

    const style = {
        width: '100%',
        height: '100%',
        zIndex: '500',
        backgroundColor: '#1a1a1aa6',
        position: 'absolute',
        top: '0',
        left: '0'
    }

    if (!backdrop) return;

    return (
        <div style={style} onClick={ toggleBackdrop }>

        </div>
    )

}

export default Backdrop;
