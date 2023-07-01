import React from 'react'
import './Modal.css'

export default function ModalCompo({ isOpen, onClose }) {
    if (!isOpen) {
        return null; // Render nothing if the modal is closed
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Modal Title</h2>
                <p>Modal content goes here.</p>
            </div>
        </div>
    );
}
