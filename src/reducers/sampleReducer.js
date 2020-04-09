import { SAMPLE_ACTION_TYPE } from '../constants/actionTypes';

const initialState = {
    status: false,
    text: "Sample Action",
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SAMPLE_ACTION_TYPE:
            return { 
                ...state,
                status: !state.status,
                text: action.payload.data
            };

        default:
            return state;
    }
};