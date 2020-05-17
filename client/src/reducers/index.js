import {combineReducers} from "redux";
import cusReducer from './cusReducer';
import itemReducer from './itemReducer';


export default combineReducers({

    item : itemReducer,
    cus : cusReducer

});