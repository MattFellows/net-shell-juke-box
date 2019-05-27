import { combineReducers } from "redux";
import {TYPES} from "./actions";

const initialState = {
    token: '',
    service: {}
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SET_TOKEN:
            return {
                token: action.payload,
                ...state,
            };
        case TYPES.SET_SERVICE:
            return {
                service: action.payload,
                ...state
            };
        default:
            return state;
    }
};


export default combineReducers({rootReducer: rootReducer});
