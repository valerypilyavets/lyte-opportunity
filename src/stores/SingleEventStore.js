import {observable, action} from 'mobx';
import axios from "axios";
import SingleEventModel from "../models/SingleEventModel";
import Cookies from "js-cookie";


export default class SingleEventStore {
    @observable event = {};
    @observable status = '';
    @observable isEditing = false;

    @action fetchEvent(id) {
        this.status = 'fetching';
        axios.get('http://api.my-events.site/api/v1/events/' + id).then(this.succeedEventFetch).catch(this.failEventFetch);
    }

    @action.bound succeedEventFetch(response) {
        this.status = 'succeeded';
        const event = response.data;

        this.event = new SingleEventModel(
            event.id,
            event.name,
            event.description_html,
            event.uri,
            event.logo_uri,
            event.category,
            event.organizer,
            event.start_time,
            event.finish_time,
            event.max_ticket_price,
            event.min_ticket_price,
            event.ticket_price_currency
        );
    }

    @action.bound failEventFetch(error) {
        this.status = 'failed';
    }

    @action editEvent(name, uri, logoUri) {
        this.status = 'editing';
        const data = {
            name: name,
            uri: uri,
            logo_uri: logoUri
        };
        const config = {
            headers: {"Authorization": "Token " + Cookies.get('auth-token')},
        };
        axios.patch('http://api.my-events.site/api/v1/events/' + this.event.id + '/', data, config).then(this.succeedEventEdit).catch(this.failEventEdit);
    }

    @action.bound succeedEventEdit(response) {
        this.status = 'edited';
        location.reload();
    }

    @action.bound failEventEdit(error) {
        this.status = 'failed';
    }
}
