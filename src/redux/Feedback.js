import * as ActionTypes from './ActionTypes';

export const feedback = (state = {
    feedback:[],
}, action ) =>{
    switch (action.type) {
    
        case ActionTypes.ADD_COMMENT:

            return {...state, feedback: state.feedback.concat(action.payload)};
            
        default: return state ;
    }
}