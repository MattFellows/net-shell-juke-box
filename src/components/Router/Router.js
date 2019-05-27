import React, {Component} from 'react';

import './Router.css'
import Search from '../Search/Search';
import Auth from '../Auth/Auth';
import AuthSuccess from '../Auth/AuthSuccess';
import {connect} from "react-redux";
import {BrowserRouter, Switch, Route} from "react-router-dom";

class Router extends Component {
    render() {
        return (
            <div className={'App'}>
                <BrowserRouter>
                    <div className={'App-body'}>
                        <Switch>
                            <Route exact path={'/'} render={() => <Auth/>}/>
                            <Route exact path={'/AuthSuccess'} render={() => <AuthSuccess/>}/>
                            <Route exact path={'/Search'} render={() => <Search/>}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    accessToken: state.token,
});

export default connect(mapStateToProps)(Router);
