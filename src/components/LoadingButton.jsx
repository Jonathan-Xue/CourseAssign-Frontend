import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import './LoadingButton.scss';

const LoadingButton = (props) => {
    return (
		<Button {...props} disabled>
			<Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>
		</Button>
    );
}

export default LoadingButton;