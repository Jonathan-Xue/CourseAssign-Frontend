import React, { Component } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import './LoginView.scss';

import background from '../assets/background.jpg';

class LoginView extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',

            loginError: false,
        };
    }

    // componentDidMount
    componentDidMount() {

    }

    // Form Input
    textInput = (e) => {
        this.setState({ 
            ...this.state,
            [e.target.name]: e.target.value.trim(),
        });
    }

    // Button Handlers
    signInButtonClickHandler = (event) => {
        if (this.state.username && this.state.password) {
            this.props.history.push({
                pathname: '/home',
                state: {}
            });
        } else {
            this.setState({
                ...this.state,
                loginError: true,
            })
        }
    }

    registerButtonClickHandler= (event) => {
        this.props.history.push({
            pathname: '/home',
            state: {}
        });
    }

    // Render
    render() {
        return (
            <div className="login">
                <div className="left">
                    <img className="background" alt='' src={background} />
                </div>

                <div className="right">
                    <div className="header">
                        <h1 className="brand">Course Assign</h1>
                    </div>

                    <Form className="form">
                        { this.state.loginError && <Alert variant="danger">Invalid username/password combination!</Alert> }
                        
                        <Form.Group controlId="username">
                            <Form.Control required name="username" onChange={this.textInput} placeholder='Username/Email'/>
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Control type="password" name="password" onChange={this.textInput} placeholder='Password'/>
                        </Form.Group>

                        <Button block className="signin-button" onClick={this.signInButtonClickHandler}>Sign In</Button>

                        <Button block className="register-button" onClick={this.registerButtonClickHandler}>Register</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default LoginView;