import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import "./css/tailwind.css"
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Article from "./components/Article";
import Impress from "./components/Impress";
import Ackee from "./components/Ackee";

ReactDOM.render(
    <BrowserRouter>
        <Ackee />
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/impressprivacy" component={Impress} />
            <Route path="/article/:id" component={Article}/>

            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
