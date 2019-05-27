import React from 'react';
import './AlbumArt.css';
import './react-contextmenu.css';
import SpotifyAPIService from "../../services/SpotifyAPI/SpotifyAPI";

export default class AlbumArt extends React.Component {

    handleClick = (e, data) => {
        console.log('Data: ', data);
        switch (data.action) {
            case 'addToParty':
                debugger;
                SpotifyAPIService.addToPlaylist({type:data.type, uri:data.uri});
                break;
            default:
                break;
        }
    }

    render() {
        return(
            <div className={'artContainer'} style={{width:'200px'}}>
                <div className={'art'} style={{backgroundImage:this.props.albumImage ? `url("${this.props.albumImage.url}")` : ''}}/>
                <h3>{`${this.props.name}`}</h3>
            </div>
        );
    }
}
