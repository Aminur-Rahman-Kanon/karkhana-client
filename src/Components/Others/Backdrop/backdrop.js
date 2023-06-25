import React from "react";

const Backdrop = ({backdrop, toggleBackdrop}) => {

    const style = {
        width: '100%',
        height: '100%',
        zIndex: '800',
        backgroundColor: '#1a1a1aa6',
        position: 'fixed',
        top: '0',
        left: '0'
    }

    if (!backdrop) return;

    return (
        <div data-testid="backdrop" style={style} onClick={ toggleBackdrop }>

        </div>
    )

}

export default Backdrop;
