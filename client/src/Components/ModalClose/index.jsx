import React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.css';

function ModalClose(){

    function close (){
        let modal = document.getElementById('modal');
        ReactDOM.unmountComponentAtNode(modal);
    }

    return (
        <>
        <div>
            <p className="modal-close" onClick={()=> {
                close();
            }}>Close</p>
        </div>
        </>
    )
}

export default ModalClose;