import React, { Component } from 'react';
import { Redirect } from "react-router";
import { Alert, Button, Form } from 'react-bootstrap';
import background from '../assets/background.jpg';
import './LoginView.scss';

import { connect } from 'react-redux';
import { login, loginWithGoogle } from '../actions/authActions';

class LoginView extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
        };
    }

    // Form Input
    textInput = (e) => {
        this.setState({ 
            ...this.state,
            [e.target.name]: e.target.value.trim(),
        });
    }

    // Button Handlers
    signInButtonClickHandler = (e) => {
        this.props.dispatch(login(this.state.email, this.state.password))
    }

    googleSignInButtonClickHandler = (e) => {
        this.props.dispatch(loginWithGoogle());
    }

    registerButtonClickHandler = (e) => {
        // TODO:
    }

    // Render
    render() {
        if (this.props.auth.isAuthenticated) {
            return <Redirect to="/" />;
        } else { 
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
                            { this.props.auth.loginError && <Alert variant="danger">Invalid email/password combination!</Alert> }
                            
                            <Form.Group controlId="email">
                                <Form.Control required name="email" onChange={this.textInput} placeholder='Email'/>
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Control type="password" name="password" onChange={this.textInput} placeholder='Password'/>
                            </Form.Group>

                            <Button block className="signin-button" onClick={this.signInButtonClickHandler}>Sign In</Button>

                            <Button block className="signin-button" onClick={this.googleSignInButtonClickHandler}>Sign In With Google</Button>

                            <Button block className="register-button" onClick={this.registerButtonClickHandler}>Register</Button>
                        </Form>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = store => {
    return {
        auth: store.auth,
    }
}

export default connect(mapStateToProps)(LoginView);