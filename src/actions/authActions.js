import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILED, VERIFY_REQUEST, VERIFY_SUCCESS } from '../constants/actionTypes';
import { auth, provider } from "../firebase";

// Actions
const loginRequest = () => {
    return {
        type: LOGIN_REQUEST,
    }
}

const loginSuccess = (res) => {
    return {
        type: LOGIN_SUCCESS,
        payload: res,
    }
}

const loginFailed = (err) => {
    return {
        type: LOGIN_FAILED,
        payload: err,
    }
}

const logoutRequest = () => {
    return {
        type: LOGOUT_REQUEST,
    }
}

const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS,
    }
}

const logoutFailed = (err) => {
    return {
        type: LOGOUT_FAILED,
        payload: err,
    }
}

const verifyRequest = () => {
    return {
        type: VERIFY_REQUEST,
    };
}

const verifySuccess = () => {
    return {
        type: VERIFY_SUCCESS,
    };
}

// Thunk
export const login = (email, password) => dispatch => {
    dispatch(loginRequest());

    auth.signInWithEmailAndPassword(email, password).then(res => {
        dispatch(loginSuccess(res.user));
    }).catch(err => {
        dispatch(loginFailed(err));
    });
};

export const loginWithGoogle = () => dispatch => {
    dispatch(loginRequest());

    auth.signInWithPopup(provider).then(res => {
        dispatch(loginSuccess(res.user));
    }).catch(err => {
        dispatch(loginFailed(err));
    });
}

export const logout = () => dispatch => {
    dispatch(logoutRequest());

    auth.signOut().then(() => {
        dispatch(logoutSuccess());
    }).catch(err => {
        dispatch(logoutFailed(err));
    });
};

export const verifyAuth = () => dispatch => {
    dispatch(verifyRequest());

    auth.onAuthStateChanged(user => {
        if (user) {
            dispatch(loginSuccess(user));
        }

        dispatch(verifySuccess());
    });
};