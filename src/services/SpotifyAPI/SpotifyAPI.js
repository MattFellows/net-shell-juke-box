import SpotifyWebApi from "spotify-web-api-js";
import config from '../../conf/config';

const PLAYLIST_NAME = 'NetShell Party Playlist';

class SpotifyAPIService {

    constructor(accessToken) {
        this.sessionStorage = {token:'', refreshToken: ''};
        this.SpotifyAPI = new SpotifyWebApi();
        if (accessToken) {
            this.SpotifyAPI.setAccessToken(accessToken);
        }
        this.partyPlaylist = null;
        this.me = null;
    }

    login() {
        document.location.href = config.AUTH_DOMAIN + '/api/login';
    }

    arrayToObject(array) {
        return array.reduce((obj, item) => {
            obj[item.key] = item.value;
            return obj
        }, {});
    }

    refreshToken() {
        document.location.href = config.AUTH_DOMAIN + '/api/refresh_token?refresh_token=' + this.sessionStorage.refreshToken;
    }


    handleLogin() {
        if (window.location.hash) {
            const params = window.location.hash.match(/.*#(.*)/)[1].split('&').map(pairs => {
                const parts = pairs.split('=');
                return {key: parts[0], value: parts[1]}
            });
            if (params && Array.isArray(params)) {
                const paramsObj = this.arrayToObject(params);
                this.sessionStorage.token = paramsObj['access_token'];
                this.sessionStorage.refreshToken = paramsObj['refresh_token'];
                this.SpotifyAPI.setAccessToken(this.sessionStorage.token);
            }
        }
        return {token: this.sessionStorage.token, refreshToken: this.sessionStorage.refreshToken};
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
        return this.SpotifyAPI.searchTracks(search);
    }

    addTrackToPlaylist(uri) {
        this.getPlaylist().then(playlist => {
            this.SpotifyAPI.getPlaylistTracks(playlist.id).then(tracks => {
                const existingTrack = tracks.items.find(i => i.track.uri === uri);
                if (!existingTrack) {
                    this.SpotifyAPI.addTracksToPlaylist(playlist.id, [uri]).then(existingTrack => {
                        this.SpotifyAPI.getPlaylistTracks(playlist.id).then(tracks => {
                            this.positionNextToPlay(tracks.items.find(i => i.track.uri === uri));
                        });
                    });
                } else {
                    this.positionNextToPlay(existingTrack);
                }
            });
        });
    }

    positionNextToPlay(existingTrack) {
        this.getPlaylist().then(playlist => {
            this.SpotifyAPI.getPlaylistTracks(playlist.id).then(tracks => {
                this.getCurrentTrack().then(currentlyPlayingTrack => {
                    debugger;
                    const currentlyPlayingTrackInTracks = tracks.items.find(t => t.track.uri === currentlyPlayingTrack.item.uri);
                    const currentlyPlayingTrackPosition = tracks.items.indexOf(currentlyPlayingTrackInTracks);
                    const existingTrackinTracks = tracks.items.find(t => t.track.uri === existingTrack.track.uri);
                    const tracksCurrentPositionInPlaylist = tracks.items.indexOf(existingTrackinTracks);
                    this.SpotifyAPI.reorderTracksInPlaylist(playlist.id, tracksCurrentPositionInPlaylist, currentlyPlayingTrackPosition ? currentlyPlayingTrackPosition + 1 : tracks.items.length);
                });
            });
        });
    }

    addToPlaylist({type, uri}) {
        switch(type) {
            case 'Tracks':
                this.addTrackToPlaylist(uri);
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
            return new Promise((resolve, reject) => resolve(this.partyPlaylist));
        }
        return this.getMe().then(me => {
            this.me = me;
            return this.SpotifyAPI.getUserPlaylists(me.id).then(playlistsResponse => {
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
        return this.SpotifyAPI.play();
    }

    pause() {
        return this.SpotifyAPI.pause();
    }

    getCurrentTrack() {
        return this.SpotifyAPI.getMyCurrentPlayingTrack()
            .then(res => {
                return new Promise((resolve, rej) => {
                    resolve(res);
                });
            }, res => {
                return new Promise((resolve, reject) => {
                    reject(res);
                });
            })
            .catch(e => {
                this.handleNotLoggedIn()
            });
    }

    isCurrentlyPlaying() {
        return this.SpotifyAPI.getMyCurrentPlaybackState().catch(this.handleNotLoggedIn);
    }

    handleNotLoggedIn() {
        if (this.sessionStorage.refreshToken && this.sessionStorage.refreshToken.length > 0) {
            this.refreshToken();
        } else {
            this.login();
            setTimeout(this.refreshToken, 20000);
        }
    }

    getDevices() {
        return this.SpotifyAPI.getMyDevices().then(devices => {
            this.devices = devices.devices;
            console.log(this.devices);
            return this.devices;
        })
    }

    transferToDevice(device) {
        return this.SpotifyAPI.transferMyPlayback([device.id], {play: true});
    }

}

const instance = new SpotifyAPIService();

export default instance;


