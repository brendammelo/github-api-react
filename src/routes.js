import {BrowserRouter, Switch, Route} from 'react-router-dom';
import React from 'react';

import Main from './pages/Main/index';
import Repository from './pages/Repository/index';
import RepoIssue from './pages/Issues';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main}></Route>
                <Route path="/repository/:repository"  component={Repository}></Route>
                <Route path="/issue/:issue"  component={RepoIssue}></Route>
            </Switch>
        </BrowserRouter>
    );
}