import React from "react";
import * as PropTypes from "prop-types";
import AlbumArt from "./AlbumArt";
import ContextMenuWrapper from "./ContextMenuWrapper";

export default class SearchResultsContainer extends React.Component {

    render() {
        return (
            <React.Fragment>
                <h1>{this.props.containerName}</h1>
                <div className={"ResultsContainer"}>
                    {this.props.results && this.props.results.map(result => (
                        <ContextMenuWrapper type={this.props.containerName} result={result}>
                            <AlbumArt type={this.props.containerName} result={result} albumImage={result.images ? result.images.find(i => i.height === 300) : result.album.images.find(i => i.height === 300)} name={result.name}/>
                        </ContextMenuWrapper>

                        )
                    )}
                </div>
            </React.Fragment>
        )
    }
}

SearchResultsContainer.propTypes = {
    results: PropTypes.array,
};
