import React from 'react';
import './alert.css';

export const Alert = ({ message }) => {
    return (
        <div className="alert">
            <p>{message}</p>
        </div>
    );
};
