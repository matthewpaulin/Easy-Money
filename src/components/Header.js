import React from 'react';

export const Header = () => {
    return (
        <>
            <img id="logo" src={process.env.PUBLIC_URL + '/logo.png'}  alt="Logo" />
        </>
    )
}
