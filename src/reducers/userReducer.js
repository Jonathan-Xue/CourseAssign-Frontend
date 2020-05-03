import { LOGIN, LOGOUT } from '../constants/actionTypes';

const initialState = {
    profile: {},
    status: false,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return { 
                ...state,
                profile: action.payload,
                status: true,
            };

        case LOGOUT:
            return {
                ...initialState
            };

        default:
            return state;
    }
};