import React from 'react';
import {inject, observer} from 'mobx-react';
import Loading from "../common/Loading";
import Error from "../common/Error";
import SingleEvent from "../SingleEvent";


@inject("singleEventStore")
@observer
export default class SingleEventScreen extends React.Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.singleEventStore.fetchEvent(id);
    }

    render() {

        return (
            <div>
                <Loading display={this.props.singleEventStore.status === 'fetching' && Object.entries(this.props.singleEventStore.event).length === 0 }/>
                <Error display={this.props.singleEventStore.status === 'failed'}/>
                <SingleEvent display={Object.entries(this.props.singleEventStore.event).length !== 0 }/>
            </div>
        );
    }
}