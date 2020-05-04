import React, { Component } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import './NavBar.scss';

import { connect } from 'react-redux';
import { logout } from '../actions/authActions';

class NavBar extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
        };
    }

    // Button Handlers
    signoutButtonClickHandler = (event) => {
        this.props.dispatch(logout());
    }

    // Render
    render() {
        return (
            <Navbar bg="dark" className="navbar" expand="sm" sticky="top" variant="dark">
                <Navbar.Brand>
                    <img className="d-inline-block align-top" src={logo} alt="" width="30" height="30"/>
                    Course Assign
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="mr-auto">
                        <Link className="nav-link" to="/">Home</Link>
                    </Nav>

                    <Navbar.Text className="text">
                        Signed In As: <Link to="/profile">{this.props.auth.profile.email.substring(0, this.props.auth.profile.email.lastIndexOf("@"))}</Link>
                    </Navbar.Text>
                    <Nav.Item>
                        <Button variant="danger" onClick={this.signoutButtonClickHandler}>Logout</Button>
                    </Nav.Item>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = store => {
    return {
        auth: store.auth,
    }
}

export default connect(mapStateToProps)(NavBar);