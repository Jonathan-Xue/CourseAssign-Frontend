import React, { Component } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { auth } from "../firebase";
import logo from '../assets/logo.svg';
import './NavBar.scss';

import { connect } from 'react-redux';
import { login, logout } from '../actions/userActions.js';

class NavBar extends Component {
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
        // Firebase Auth
        auth.onAuthStateChanged(res => {
            if (res) {
                // Update Store
                if (!this.props.user.status) {
                    this.props.dispatch(login(res));
                }
            } else {
                this.props.history.push({
                    pathname: "/login",
                    state: {}
                });
            }
        });
    }

    // Button Handlers
    signoutButtonClickHandler = (event) => {
        auth.signOut().then(() => {
            this.props.dispatch(logout());
        }).catch(err => {
            console.log(err);
        });
    }

    // Render
    render() {
        return (
            <Navbar bg="dark" className="navbar" expand="lg" sticky="top" variant="dark">
                <Navbar.Brand>
                    <img className="d-inline-block align-top" src={logo} alt="" width="30" height="30"/>
                    Course Assign
                </Navbar.Brand>

                <Navbar.Toggle/>
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="mr-auto">
                        <Link className="nav-link" to="/">Home</Link>
                    </Nav>

                    <Navbar.Text>
                        Signed In As: <Link to="/profile">{this.props.user.status && this.props.user.profile.email.substring(0, this.props.user.profile.email.lastIndexOf("@"))}</Link>
                    </Navbar.Text>
                    <Nav.Item>
                        <Button className="logout-btn" variant="danger" onClick={this.signoutButtonClickHandler}>Logout</Button>
                    </Nav.Item>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = store => {
    return {
        user: store.user,
    }
}

export default connect(mapStateToProps, undefined)(NavBar);