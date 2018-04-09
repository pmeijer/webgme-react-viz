import {combineReducers} from 'redux';
//import update from 'immutability-helper';

const activeNode = (state = '', action) => {
    if (action.type === 'SET_ACTIVE_NODE') {
        return action.activeNode;
    }

    return state;
};

const activeSelection = (state = [], action) => {
    if (action.type === 'SET_ACTIVE_SELECTION') {
        return action.activeSelection;
    }

    return state;
};

export default combineReducers({
    activeNode,
    activeSelection,
});