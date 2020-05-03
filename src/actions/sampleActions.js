import { SAMPLE_ACTION_TYPE } from '../constants/actionTypes';

export function sampleAction() {
    return {
        type: SAMPLE_ACTION_TYPE,
        payload: {
            data: "Sample Action Triggered"
        }
    };
};