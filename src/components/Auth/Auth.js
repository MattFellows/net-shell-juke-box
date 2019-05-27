import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import SpotifyAPIService from "../../services/SpotifyAPI/SpotifyAPI";

class Auth extends Component {
    constructor(props) {
        super(props);

        SpotifyAPIService.login();
    }

    render() {
        return (<Fragment></Fragment>);
    }
}

const mapStateToProps = state => ({
    token: state.token,
});

export default connect(mapStateToProps)(Auth);
