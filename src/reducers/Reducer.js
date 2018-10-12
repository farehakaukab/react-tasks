import {combineReducers} from "redux";
import {pendingTasksReducer} from 'react-redux-spinner';

const initialStates= {suggestedBooks:[],bookDetails:[],totalResults:0, dataFetched:false};

const Reducer=(state=initialStates, action) => {
    switch(action.type){
        case "START_FETCHING_DATA":{
            return {...state,suggestedBooks:[],bookDetails:[],totalResults:0,dataFetched:false};
        }
        case "FINISHED_FETCHING_DATA":{
            return {...state,dataFetched:true};
        }
        case "SHOW_BOOKS": {
            return (action.bookslistType=='Books List' && action.books!='no record found.')?
            {...state, suggestedBooks: state.suggestedBooks.concat(action.books),totalResults:action.count} 
            : {...state, suggestedBooks: action.books,totalResults:action.count};
        }
        case "SHOW_BOOK_DETAILS":{
            return {...state,bookDetails:action.book};
        }
        default:{
            return state;
        }
    }
}

const red= combineReducers({Reducer,pendingTasksReducer});
export default red;