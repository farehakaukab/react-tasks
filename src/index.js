import React from "react";
import ReactDOM from "react-dom";
import BookDetails from "./Components/BookDetails"
import Main from "./Components/Main";
import BooksList from "./Components/BooksList";
import Error from "./Components/Error";
import {BrowserRouter,Route,Switch} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";

ReactDOM.render(
    <Provider store={store}>
         <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/BookDetails/:id" component={BookDetails} />
                <Route path="/BooksList/:input" component={BooksList} />
                <Route component={Error} />
            </Switch>
        </BrowserRouter>
    </Provider>, document.getElementById('root')
);