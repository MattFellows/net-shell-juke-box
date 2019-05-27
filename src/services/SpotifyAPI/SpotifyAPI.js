import SpotifyWebApi from "spotify-web-api-js";

const PLAYLIST_NAME = 'NetShell Party Playlist';

class SpotifyAPIService {

    constructor(accessToken) {
        this.sessionStorage = {};
        this.clientId = 'afc7874799bd46308170721748037e72';
        this.redirectURI = 'http://netshell-jukebox.com:3000/AuthSuccess';
        this.SpotifyAPI = new SpotifyWebApi();
        if (accessToken) {
            this.SpotifyAPI.setAccessToken(accessToken);
        }
        this.partyPlaylist = null;
        this.me = null;
    }

    login() {
        var scopes = 'user-read-playback-state user-modify-playback-state user-read-recently-played user-top-read user-library-modify user-library-read playlist-read-private playlist-modify-public playlist-modify-private playlist-read-collaborative user-read-currently-playing app-remote-control streaming user-follow-read user-follow-modify';
        document.location.href = ('https://accounts.spotify.com/authorize' +
            '?response_type=token' +
            '&client_id=' + this.clientId +
            (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
            '&redirect_uri=' + encodeURIComponent(this.redirectURI));
    }

    arrayToObject(array) {
        return array.reduce((obj, item) => {
            obj[item.key] = item.value;
            return obj
        }, {});
    }


    handleLogin() {
        if (window.location.hash) {
            const params = window.location.hash.match(/.*#(.*)/)[1].split('&').map(pairs => {
                const parts = pairs.split('=');
                return {key: parts[0], value: parts[1]}
            });
            console.log(params);
            if (params && Array.isArray(params)) {
                const paramsObj = this.arrayToObject(params);
                this.sessionStorage.token = paramsObj['access_token'];
                this.SpotifyAPI.setAccessToken(this.sessionStorage.token);
                console.log('Expires in: ', paramsObj['expires_in']);
            }
        }
        return this.SpotifyAPI.getAccessToken();
    }

    searchAlbums(search)  {
        return this.SpotifyAPI.searchAlbums(search);
    }
    searchArtists(search)  {
        return this.SpotifyAPI.searchArtists(search);
    }
    searchPlaylists(search)  {
        return this.SpotifyAPI.searchPlaylists(search);
    }
    searchTracks(search)  {
        let trackSearchResponsePromise = this.SpotifyAPI.searchTracks(search);
        return trackSearchResponsePromise;
    }

    addToPlaylist({type, uri}) {
        switch(type) {
            case 'Tracks':
                this.getPlaylist().then(playlist => {
                    console.log(playlist);
                    this.SpotifyAPI.getPlaylistTracks(playlist.id).then(tracks => {
                        console.log(tracks);
                        const existingTrack = tracks.items.find(i => i.track.uri === uri);
                        if (existingTrack) {
                            const tracksCurrentPositionInPlaylist = tracks.items.indexOf(existingTrack);
                            this.SpotifyAPI.reorderTracksInPlaylist(playlist.id, tracksCurrentPositionInPlaylist, tracks.items.length);
                        } else {
                            this.SpotifyAPI.addTracksToPlaylist(playlist.id, [uri]);
                        }
                    });
                })
                break;
            case 'Albums':
            case 'Artists':
            case 'Playlists':
            default:
                break;
        }
    }

    getMe() {
        if (this.me) {
            return new Promise(res => res(this.me));
        }
        return this.SpotifyAPI.getMe();
    }

    getPlaylist() {
        if (this.partyPlaylist) {
            return this.partyPlaylist;
        }
        return this.getMe().then(me => {
            console.log(me);
            return this.SpotifyAPI.getUserPlaylists(me.id).then(playlistsResponse => {
                console.log(playlistsResponse);
                const partyPlaylist = playlistsResponse.items.find(p => p.name === PLAYLIST_NAME);
                if (partyPlaylist) {
                    this.partyPlaylist = partyPlaylist;
                    return partyPlaylist;
                }
                return this.SpotifyAPI.createPlaylist(me.id, {name: PLAYLIST_NAME, public: false,}).then(newPlaylist => {
                    this.partyPlaylist = newPlaylist;
                    return newPlaylist;
                });
            })
        });
    }

    play() {
        this.SpotifyAPI.play();
    }

    pause() {
        this.SpotifyAPI.pause();
    }

    getCurrentTrack() {
        return this.SpotifyAPI.getMyCurrentPlayingTrack();
    }

    isCurrentlyPlaying() {
        return this.SpotifyAPI.getMyCurrentPlaybackState()
    }

}

const instance = new SpotifyAPIService();

export default instance;


