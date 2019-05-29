import React, {Component} from 'react';
import {connect} from "react-redux";
import {BrowserRouter, Switch, Route, NavLink} from "react-router-dom";

import './Router.css'
import Search from '../Search/Search';
import Auth from '../Auth/Auth';
import AuthSuccess from '../Auth/AuthSuccess';
import ChooseDevice from "../ChooseDevice/ChooseDevice";

class Router extends Component {
    render() {
        return (
            <div className={'App'}>
                <BrowserRouter>
                    <div className={'App-header'}>
                        <NavLink to={'/'}>Login</NavLink>
                        <NavLink to={'/Search'}>Search</NavLink>
                        <NavLink to={'/ChooseDevice'}>ChooseDevice</NavLink>
                    </div>
                    <div className={'App-body'}>
                        <Switch>
                            <Route exact path={'/'} render={() => <Auth/>}/>
                            <Route exact path={'/AuthSuccess'} render={() => <AuthSuccess/>}/>
                            <Route exact path={'/Search'} render={() => <Search/>}/>
                            <Route exact path={'/ChooseDevice'} render={() => <ChooseDevice/>}/>
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
