import React from 'react';
import {observer, inject} from 'mobx-react';

import EventsListItem from "../EventListItem";
import Loading from "../common/Loading";
import Error from "../common/Error";
import {Spinner, CardColumns, ButtonToolbar, Button, Form, Col} from "react-bootstrap";
import EventsList from "../EventsList";

@inject("eventsListStore")
@observer
export default class EventsListScreen extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <Loading display={this.props.eventsListStore.status === 'fetching' && this.props.eventsListStore.events.length === 0} />
                <Error display={this.props.eventsListStore.status === 'failed'} />
                <EventsList display={this.props.eventsListStore.events.length > 0} />
            </div>
        );

    }
}
