import React from 'react';
import { Route, Switch } from 'react-router'
import { connect } from 'react-redux';
import './App.scss';

import ProtectedRoute from "./ProtectedRoute";
import HomeView from './containers/HomeView';
import LoginView from './containers/LoginView';

function AppRoutes(props) {
    return (
        <Switch>
            <Route exact path="/login" component={LoginView} />
            <ProtectedRoute exact path="/" component={HomeView} isAuthenticated={props.isAuthenticated} isVerifying={props.isVerifying}/>
        </Switch>
    );
};

function mapStateToProps(store) {
    return {
        isAuthenticated: store.auth.isAuthenticated,
        isVerifying: store.auth.isVerifying,
    };
};

export default connect(mapStateToProps)(AppRoutes);