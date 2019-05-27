import React, {Component,Fragment} from 'react';
import SearchResults from "../SearchResults/SearchResults";
import {connect} from "react-redux";
import SpotifyAPIService from "../../services/SpotifyAPI/SpotifyAPI";
import Player from "../Player/Player";

class Search extends Component {

    constructor(props) {
        super(props);

        console.log('Token:', SpotifyAPIService.SpotifyAPI.getAccessToken());
        this.state = {
            results: {
                albums: [], artists: [], playlists: [], tracks: [],
            }
        };

        this.search = this.search.bind(this);
    }

    async search() {
        const searchAlbums = SpotifyAPIService.searchAlbums(this.searchInput.value);
        const searchArtists = SpotifyAPIService.searchArtists(this.searchInput.value);
        const searchPlaylists = SpotifyAPIService.searchPlaylists(this.searchInput.value);
        const searchTracks = SpotifyAPIService.searchTracks(this.searchInput.value);
        Promise.all([searchAlbums, searchArtists, searchPlaylists, searchTracks]).then(([albumResults,artistResults,playlistResults,trackResults]) => {
            let newState = {
                results:
                    {
                        tracks: trackResults.tracks.items,
                        albums: albumResults.albums.items,
                        artists: artistResults.artists.items,
                        playlists: playlistResults.playlists.items,
                    }
            };
            console.log('newState: ', newState);
            this.setState(newState);
            return newState.results;
        }).catch(e => {
            console.log(e);
            this.setState({results:
                    {
                        tracks: [],
                        albums: [],
                        artists: [],
                        playlists: [],
                    }});
        });
    }

    render() {
        return (
            <Fragment>
                <Player/>
                Search: <input ref={(input) => this.searchInput = input} onChange={this.search}/>
                <SearchResults {...this.state.results}/>
            </Fragment>)
    }
}

const mapStateToProps = state => ({
    token: state.token,
});

export default connect(mapStateToProps)(Search);
