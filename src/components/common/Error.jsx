import React from 'react';
import {Alert} from 'react-bootstrap';
export default class EventsListItem extends React.Component {

    render() {
        const display = this.props.display ? "block" : "none";

        return (
            <div className="text-center" style={{display: display}}>
                <Alert variant="danger">Something went wrong</Alert>
            </div>
        );
    }
}
