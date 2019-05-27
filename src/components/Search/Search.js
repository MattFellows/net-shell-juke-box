import React, {Component} from 'react';
import SearchResults from "../SearchResults/SearchResults";
import {connect} from "react-redux";
import SpotifyAPIService from "../../services/SpotifyAPI/SpotifyAPI";
import Player from "../Player/Player";
import './Search.css';

class Search extends Component {

    constructor(props) {
        super(props);

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
            <div className={'search'}>
                <Player/>
                <div>
                Search: <input ref={(input) => this.searchInput = input} onChange={this.search}/>
                </div>
                <SearchResults {...this.state.results}/>
            </div>)
    }
}

const mapStateToProps = state => ({
    token: state.token,
});

export default connect(mapStateToProps)(Search);
