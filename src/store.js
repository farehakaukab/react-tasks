import {createStore, applyMiddleware} from "redux";
import logger from "redux-logger";
import { default as ReduxThunk } from 'redux-thunk';
import promise from "redux-promise-middleware";
import reducer from "./reducers/Reducer";

const middleware= applyMiddleware( ReduxThunk, promise(), logger);

export default createStore(reducer,middleware);