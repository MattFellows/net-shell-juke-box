import AlbumArt from "../SearchResults/AlbumArt";
import React from "react";
import SpotifyAPIService from '../../services/SpotifyAPI/SpotifyAPI';
import {ReactComponent as Play} from './play.svg'
import {ReactComponent as Pause} from './pause.svg'
import './Player.css';
import {connect} from "react-redux";
import {addDevice} from '../../actions';

class Player extends React.Component{

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
            SpotifyAPIService.getDevices().then(devices => {
                console.log(devices);
                devices.forEach(d => {
                    this.props.addDevice(d);
                });
            })
            this.setState({currentTrack: t});
            SpotifyAPIService.isCurrentlyPlaying()
                .then(s => {
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

    pause = () => {
        SpotifyAPIService.pause().then(() => {
            this.setState({playing: false});
        });
        this.setState({playing: false});
    };

    play = () => {
        SpotifyAPIService.play().then(() => {
            this.setState({playing: true});
        });
        this.setState({playing: true});
    };

    render() {
        return (
            <React.Fragment>
                {this.state.currentTrack && this.state.currentTrack.item &&
                    (
                        <AlbumArt type={'Now Playing'} result={this.state.currentTrack.item} albumImage={this.state.currentTrack.item.album && this.state.currentTrack.item.album.images && this.state.currentTrack.item.album.images.find(i => i.height === 300)} name={this.state.currentTrack.item.name}>
                            {this.state.currentTrack && this.state.currentTrack.item && this.state.playing && (<div className={'playpause pause'} onClick={() => {this.pause()}}><Pause style={{width: '200px', height: '200px'}}/></div>)}
                            {this.state.currentTrack && this.state.currentTrack.item && !this.state.playing && (<div className={'playpause play'} onClick={() => {this.play()}}><Play style={{width: '200px', height: '200px'}}/></div>)}
                        </AlbumArt>
                    )
                }
            </React.Fragment>
        );
    }
}

const mapDispatchhToProps = dispatch => ({
   addDevice: (device) => dispatch(addDevice(device))
});

export default connect(null, mapDispatchhToProps)(Player);
