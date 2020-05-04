import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILED, VERIFY_REQUEST, VERIFY_SUCCESS } from '../constants/actionTypes';

const initialState = {
    isLoggingIn: false,
    isLoggingOut: false,
    isVerifying: false,
    loginError: null,
    logoutError: null,
    isAuthenticated: false,
    
    profile: {}
};

export default (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoggingIn: true,
                loginError: null,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: true,
                profile: action.payload,
            };
        case LOGIN_FAILED:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: false,
                loginError: action.payload,
            };
        case LOGOUT_REQUEST:
            return {
                ...state,
                isLoggingOut: true,
                logoutError: null,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggingOut: false,
                isAuthenticated: false,
                profile: {},
            };
        case LOGOUT_FAILED:
            return {
                ...state,
                isLoggingOut: false,
                logoutError: action.payload,
            };
        case VERIFY_REQUEST:
            return {
                ...state,
                isVerifying: true,
            };
        case VERIFY_SUCCESS:
            return {
                ...state,
                isVerifying: false,
            };
        default:
            return state;
    }
};