import React from 'react';
import './AlbumArt.css';
import './react-contextmenu.css';

export default class AlbumArt extends React.Component {

    render() {
        return(
            <div className={'artContainer'} style={{width:'200px'}}>
                <div className={'art'} style={{backgroundImage:this.props.albumImage ? `url("${this.props.albumImage.url}")` : ''}}>
                    {this.props.children}
                </div>
                <h3>{`${this.props.name}`}</h3>
            </div>
        );
    }
}
