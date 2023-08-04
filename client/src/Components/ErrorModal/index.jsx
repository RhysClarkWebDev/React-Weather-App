import React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.css';

import ModalClose from '@/Components/ModalClose';

function ErrorModal(props){
    let error = props.error;
    return (
        <>
        <div>
            <ModalClose/>
            <div>
                <h2>Error:</h2>
                <p>{error}</p>
            </div>
        </div>
        </>
    )
}


export default ErrorModal;
