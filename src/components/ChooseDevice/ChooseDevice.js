import React from 'react';
import {connect} from "react-redux";
import SpotifyAPIService from "../../services/SpotifyAPI/SpotifyAPI";
import './ChooseDevice.css';

class ChooseDevice extends React.Component {

    transferToDevice = (device) => {
        SpotifyAPIService.transferToDevice(device).then(res => {
            console.log(res);
        });
    };

    render() {
        return this.props.deviceHistory ?
            <React.Fragment>
                <h1>Devices</h1>
                {
                    this.props.deviceHistory.map(d => {
                        return (<button className={'chooseDevice'} onClick={() => this.transferToDevice(d)}>{d.name}</button>)
                    })
                }
            </React.Fragment>
         : (<h1>No Devices</h1>);
    }
}

const mapStateToProps = state => {
    console.log('State: ',state);
    return {
        deviceHistory: state.root.deviceHistory,
    }
};

export default connect(mapStateToProps)(ChooseDevice);
