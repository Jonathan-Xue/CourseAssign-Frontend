import React from 'react';
import { Spinner } from 'react-bootstrap';
import './LoadingSpinner.scss';

const LoadingSpinner = (props) => {
    return (
        <div className="spinner">
            <Spinner {...props}/>
        </div>
    );
}

export default LoadingSpinner;