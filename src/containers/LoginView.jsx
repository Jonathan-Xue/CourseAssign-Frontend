import React, { Component } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { auth, provider } from "../firebase";
import background from '../assets/background.jpg';
import './LoginView.scss';

import { connect } from 'react-redux';
import { login } from '../actions/userActions.js';

class LoginView extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',

            loginError: null,
        };
    }

    // componentDidMount
    componentDidMount() {
        // Firebase Auth
        auth.onAuthStateChanged(res => {
            if (res) {
                this.props.dispatch(login(res));

                this.props.history.push({
                    pathname: "/",
                    state: {}
                });
            }
        });
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
        auth.signInWithEmailAndPassword(this.state.username, this.state.password).then().catch(err => {
            this.setState({ loginError: err });
        });
    }

    googleSignInButtonClickHandler = (e) => {
        auth.signInWithPopup(provider).then().catch(err => {
            this.setState({ loginError: err });
        });
    }

    registerButtonClickHandler = (e) => {
        // TODO:
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

                        <Button block className="signin-button" onClick={this.googleSignInButtonClickHandler}>Sign In With Google</Button>

                        <Button block className="register-button" onClick={this.registerButtonClickHandler}>Register</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        user: store.user,
    }
}

export default connect(mapStateToProps, undefined)(LoginView);