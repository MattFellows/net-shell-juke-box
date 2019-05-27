import React, { Component } from "react";
import {connect} from "react-redux";
import {setToken} from "../../actions";
import {Redirect} from "react-router-dom";
import SpotifyAPIService from "../../services/SpotifyAPI/SpotifyAPI";

class AuthSuccess extends Component {
    constructor(props) {
        super(props);
        this.props.setToken(SpotifyAPIService.handleLogin());

        //window.location.href = '/Search';
    }

    render() {
        return (<Redirect to={'/Search'}/>);
    }
}

const mapStateToProps = state => ({
    token: state.token,
});

const mapDispatchToProps = dispatch => ({
    setToken: (token) => dispatch(setToken(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthSuccess);
