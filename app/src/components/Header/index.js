import React from 'react';
import './style.scss';

function Header() {
    return (
        <header className='p-3 mb-3 border-bottom shadow-sm header d-flex justify-content-center align-center'>
            <img src='/images/logo.svg' alt='' width='30' height='30' />
            <h1>Attlasian CRM</h1>
        </header>
    )
}

export default Header
