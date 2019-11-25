import React from 'react';
import {Spinner} from 'react-bootstrap';

export default class EventsListItem extends React.Component {

    render() {
        const display = this.props.display ? "block" : "none";

        return (
            <div className="text-center" style={{display: display}}>
                <Spinner animation="border"/>
            </div>
        );
    }
}
