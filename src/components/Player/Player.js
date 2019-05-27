import AlbumArt from "../SearchResults/AlbumArt";
import React from "react";
import SpotifyAPIService from '../../services/SpotifyAPI/SpotifyAPI';

export default class Player extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            currentTrack: null,
            playing: false,
        };

        this.updateCurrentTrackAndState();
        setInterval(this.updateCurrentTrackAndState, 5000);
    }

    updateCurrentTrackAndState = () => {
        SpotifyAPIService.getCurrentTrack().then(t => {
            console.log(t);
            this.setState({currentTrack: t});
            SpotifyAPIService.isCurrentlyPlaying().then(s => {
                console.log(s);
                this.setState({playing: s.is_playing});
            })
                .catch(e => {
                    console.log(e);
                    this.setState({playing: false});
                });
        }).catch(e  => {
            this.setState({currentTrack: null});
        });
    };

    render() {
        return (
            <React.Fragment>
                {this.state.currentTrack && this.state.currentTrack.item && (<AlbumArt type={'Now Playing'} result={this.state.currentTrack.item} albumImage={this.state.currentTrack.item.album && this.state.currentTrack.item.album.images && this.state.currentTrack.item.album.images.find(i => i.height === 300)} name={this.state.currentTrack.item.name}/>)}
                {this.state.playing && (<div className={'pause'} onClick={() => {SpotifyAPIService.pause(); this.updateCurrentTrackAndState();}}>Pause</div>)}
                {!this.state.playing && (<div className={'play'} onClick={() => {SpotifyAPIService.play(); this.updateCurrentTrackAndState();}}>Play</div>)}
            </React.Fragment>
        );
    }
}
