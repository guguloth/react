import { createStore, combineReducers } from 'redux';
import { Dishes } from './Dishes';
import { Leaders } from './Leaders';
import { Promotions } from './Promotions';
import { Comments } from './Comments';

export const ConfigureStore = () =>{
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            leaders: Leaders,
            promotions: Promotions,
            comments: Comments
        })
    );

    return store;
}