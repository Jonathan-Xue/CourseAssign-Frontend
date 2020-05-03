import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './store'
import './App.scss';

import HomeView from './containers/HomeView';
import LoginView from './containers/LoginView'

const store = configureStore()
export default function App() {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact path="/" component={HomeView} />
                    <Route exact path="/login" component={LoginView} />
                </Switch>
            </ConnectedRouter>
        </Provider>
    );
};