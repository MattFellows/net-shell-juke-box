import React from 'react';
import {ContextMenu, ContextMenuTrigger, MenuItem} from "react-contextmenu";

export default class ContextMenuWrapper extends React.Component {
    render() {
        return (
            <React.Fragment>
                <ContextMenuTrigger id={this.props.result.id}>
                    {this.props.children}
                </ContextMenuTrigger>
                <ContextMenu id={this.props.result.id}>
                    <MenuItem data={{action: 'addToParty', uri: this.props.result.uri, type:this.props.type}} onClick={this.handleClick}>
                        Add to party playlist
                    </MenuItem>
                    <MenuItem data={{foo: 'baz'}} onClick={this.handleClick}>
                        ContextMenu Item 2
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem data={{foo: 'buz'}} onClick={this.handleClick}>
                        ContextMenu Item 3
                    </MenuItem>
                </ContextMenu>
            </React.Fragment>
        )
    }
}
