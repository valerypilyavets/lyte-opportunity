import React from 'react';
import {observer, inject} from 'mobx-react';
import EventsListItem from "./EventListItem";
import {CardColumns, Button} from "react-bootstrap";
import Loading from "./common/Loading";
import CategoryFilter from "./CategoryFilter";
import FreeOnlyFilter from "./FreeOnlyFilter";
import EventListItemModel from "../models/EventsListItemModel";


@inject("eventsListStore", "categoriesStore")
@observer
export default class EventsList extends React.Component {
    constructor(props) {
        super(props);
        this.loadBy = 20;
    }

    componentDidMount() {
        this.props.eventsListStore.fetchEvents(0, this.loadBy);
    }

    handleLoadMoreClick = () => {
        this.props.eventsListStore.setCategoryFilter(0);
        this.props.eventsListStore.setFreeOnly(false);

        const eventsLoaded = this.props.eventsListStore.events.length;
        this.props.eventsListStore.fetchEvents(eventsLoaded - 1, this.loadBy);
    }

    render() {
        const display = this.props.display ? "block" : "none";

        return (
            <div style={{display: display}}>
                <h1 className="text-center">Events</h1>
                <br/>
                <FreeOnlyFilter />
                <CategoryFilter display={this.props.categoriesStore.categories.length > 0} />
                <CardColumns>
                    {this.props.eventsListStore.events.map((event, index) => {
                        if (this.props.eventsListStore.category) {
                            if (this.props.eventsListStore.category === event.categoryId) return <EventsListItem key={index} event={event}/>;
                        } else if (this.props.eventsListStore.freeOnly) {
                            if (event.price === EventListItemModel.freeEvent) return <EventsListItem key={index} event={event}/>;
                        } else {
                            return <EventsListItem key={index} event={event}/>;
                        }

                    })}
                </CardColumns>
                <br/>
                <div className="text-center">
                    <Loading display={this.props.eventsListStore.status === 'fetching'} />
                    <div style={{display: this.props.eventsListStore.status !== 'fetching' ? "block" : "none"}}>
                        <Button size="lg" onClick={this.handleLoadMoreClick} variant="primary">
                            Load more events<br/>
                            <small>(All filters will be cancelled)</small>
                        </Button>

                    </div>
                </div>
            </div>
        );
    }
}
