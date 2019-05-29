import { combineReducers } from "redux";
import {TYPES} from "./actions";

const initialState = {
    token: '',
    refreshToken: '',
    service: {},
    deviceHistories: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SET_TOKEN:
            return {
                token: action.payload,
                ...state,
            };
        case TYPES.SET_REFRESH_TOKEN:
            return {
                refreshToken: action.payload,
                ...state,
            };
        case TYPES.SET_SERVICE:
            return {
                service: action.payload,
                ...state
            };
        case TYPES.ADD_DEVICE:
            const deviceHistories = state.deviceHistories;
            if (deviceHistories.map(d => d.id).indexOf(action.payload.id) === -1) {
                deviceHistories.push(action.payload);
            }
            console.log('DeviceHistories', state, deviceHistories);
            return {
                deviceHistory: deviceHistories,
                ...state
            };
        default:
            return state;
    }
};


export default combineReducers({root: rootReducer});
