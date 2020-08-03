import {INPUT_ACTIVE,INPUT_BLUR,GET_SEARCH_TIPS,CHANGE_LIST, MOUSE_IN, MOUSE_LEAVE} from './actionTypes';
import { fromJS } from 'immutable';

const initialState = fromJS({
    inputActive: false,
    tipList:[],
    firstClick: true,
    searchPageNum: 0,
    showList:[],
    mouseIn: false,
});

const reducer = (prevState = initialState,action) => {
    let newState = prevState;
    switch(action.type){
        case INPUT_ACTIVE:
            newState = newState.set('inputActive',true);
            break;
        case INPUT_BLUR:
            newState = newState.set('inputActive',false);
            break;
        case GET_SEARCH_TIPS:
            newState = newState.set('tipList',action.dataList);
            newState = newState.set('showList',action.dataList.get(0));
            if(newState.get('firstClick') === true){
                newState = newState.set('firstClick',false);
            }
            break;
        case MOUSE_IN:
            newState = newState.set('mouseIn',true);
            break;
        case MOUSE_LEAVE:
            newState = newState.set('mouseIn',false);
            break;
        case CHANGE_LIST:
            const pageNum = (newState.get('searchPageNum')+1)%(newState.get('tipList').toArray().length);
            newState = newState.set('searchPageNum',pageNum);
            newState = newState.set('showList',newState.get('tipList').get(newState.get('searchPageNum')));
            break;
        default: ;
    }
    return newState;
    
}

export default reducer;