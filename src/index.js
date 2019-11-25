import React from "react";
import {render} from "react-dom";
import {Provider} from "mobx-react";

import EventsListScreen from "./components/screens/EventsListScreen";
import SingleEventScreen from "./components/screens/SingleEventScreen";
import Header from "./components/Header";
import EventsListStore from "./stores/EventsListStore";
import SingleEventStore from "./stores/SingleEventStore";
import CategoriesStore from "./stores/CategoriesStore";
import SignUpStore from "./stores/SignUpStore";
import LogInStore from "./stores/LogInStore";

import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";


const eventsListStore = new EventsListStore();
const singleEventStore = new SingleEventStore();
const categoriesStore = new CategoriesStore();
const signUpStore = new SignUpStore();
const logInStore = new LogInStore();
const stores = {
    eventsListStore,
    singleEventStore,
    categoriesStore,
    signUpStore,
    logInStore
};


render(
    <Provider {...stores}>
        <div style={{padding: '50px 80px'}}>
            <Header/>
            <br/>
                <Router>
                    <Switch>
                        <Route path="/event/:id" component={SingleEventScreen} />
                        <Route exact path="/" component={EventsListScreen} />
                    </Switch>
                </Router>

        </div>
    </Provider>,
    document.getElementById("root")
);
