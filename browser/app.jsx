import Pages from '../src/Page.jsx'
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import store from '../src/store.js';

const history = createBrowserHistory();
store.inital=window.__INITIAL_DATA__;
console.log("store"+store.inital)
 const ele= (  
    <div>
            <Router  history={history}>
                 <Pages/>
            </Router>
    </div>
  
 );
 const root=document.getElementById("con");

ReactDOM.hydrate(ele,root)
if (module.hot) { module.hot.accept(); }
