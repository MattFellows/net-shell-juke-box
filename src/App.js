import React, {Component} from 'react';
import Router from "./components/Router/Router";
import {connect} from "react-redux";

class App extends Component {

    render() {
        return (
            <Router />
        );
    }
}

const mapStateToProps = state => {
    return ({
        token: state.token,
        service: state.service,
    });
};

export default connect(mapStateToProps)(App);
