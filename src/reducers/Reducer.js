//import {combineReducers} from "redux"
const initialStates= {suggestedBooks:[],bookDetails:[],totalResults:0};

const Reducer=(state=initialStates, action) => {
    switch(action.type){
        case "SHOW_BOOKS": {
            return {...state,suggestedBooks:action.books};
        }
        case "SHOW_BOOK_DETAILS":{
            return {...state,bookDetails:action.book};
        }
        case "SHOW_RESULT_COUNT":{
            return {...state,totalResults:action.count};
        }
        default:{
            return state;
        }
    }
}
//const red= combineReducers({Reducer});
export default Reducer;