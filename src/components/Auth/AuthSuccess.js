import React from "react";
import {connect} from "react-redux";
import {setToken,setRefreshToken} from "../../actions";
import {Redirect} from "react-router-dom";
import SpotifyAPIService from "../../services/SpotifyAPI/SpotifyAPI";

class AuthSuccess extends React.Component {
    constructor(props) {
        super(props);
        let tokenContainer = SpotifyAPIService.handleLogin();
        console.log('TokenContainer: ', tokenContainer);
        this.props.setToken(tokenContainer.token);
        this.props.setRefreshToken(tokenContainer.refreshToken);

        //window.location.href = '/Search';
    }

    render() {
        console.log(`Token: ${this.props.token}, RefreshToken: ${this.props.refreshToken}`);
        return (<Redirect to={'/Search'}/>);
    }
}

const mapStateToProps = state => ({
    token: state.token,
    refreshToken: state.refreshToken,
});

const mapDispatchToProps = dispatch => ({
    setToken: (token) => dispatch(setToken(token)),
    setRefreshToken: (token) => dispatch(setRefreshToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthSuccess);
