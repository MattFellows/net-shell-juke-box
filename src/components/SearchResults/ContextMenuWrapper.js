import React from 'react';
import {ContextMenu, ContextMenuTrigger, MenuItem} from "react-contextmenu";
import SpotifyAPIService from "../../services/SpotifyAPI/SpotifyAPI";

export default class ContextMenuWrapper extends React.Component {

    handleClick = (e, data) => {
        switch (data.action) {
            case 'addToParty':
                SpotifyAPIService.addToPlaylist({type:data.type, uri:data.uri});
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <React.Fragment>
                <ContextMenuTrigger id={this.props.result.id}>
                    {this.props.children}
                </ContextMenuTrigger>
                <ContextMenu id={this.props.result.id}>
                    <MenuItem data={{action: 'addToParty', uri: this.props.result.uri, type:this.props.type}} onClick={this.handleClick}>
                        Add to party playlist
                    </MenuItem>
                </ContextMenu>
            </React.Fragment>
        )
    }
}
