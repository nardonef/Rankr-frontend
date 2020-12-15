// import the dependency
// import remove from 'lodash.remove'

import {ADD_TOKEN, ADD_EMAIL, DELETE_TOKEN} from "./actions";

const initialState = {
    tokens: {}
};

function tokenReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TOKEN:
            return {
                ...state,
                tokens: action.tokens,
            }
        case DELETE_TOKEN:
            state.tokens = {};
            return {...state}
        case ADD_EMAIL:
            return {
                ...state,
                email: action.email,
            }
        default:
            return state
    }
}

export default tokenReducer