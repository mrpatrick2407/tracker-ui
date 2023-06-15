import {Switch,Route,Redirect,useLocation} from 'react-router-dom'
import IssueList from './IssueList.jsx';
import IssueReport from './IssueReport.jsx';
import IssueEdit from './IssueEdit.jsx';
import IssueAbout from './IssueAbout.jsx';
import React from 'react';
import routes from './routes.js';


function LocationProvider({children}){
    return (<AnimatePresence>{children}</AnimatePresence>)
}

export default function Content(){
    return(
        
            <Switch >
             <Redirect exact from='/' to ='/issues' />
            {routes.map(attrs => <Route key={attrs.path}  {...attrs} />)}
              
           
            </Switch>   
        
         
    )
}