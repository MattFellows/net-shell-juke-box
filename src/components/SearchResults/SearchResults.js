import React from "react";
import SearchResultsContainer from "./SearchResultsContainer";
import './SearchResults.css';


class SearchResults extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <React.Fragment>
                <SearchResultsContainer containerName={'Tracks'} results={this.props.tracks}/>
                <SearchResultsContainer containerName={'Albums'} results={this.props.albums}/>
                <SearchResultsContainer containerName={'Artists'} results={this.props.artists}/>
                <SearchResultsContainer containerName={'Playlists'} results={this.props.playlists}/>
            </React.Fragment>
        );
    }
}

export default SearchResults;
