import {observable, computed, reaction, action} from 'mobx';
import axios from "axios";
import EventsListItemModel from "../models/EventsListItemModel";



export default class EventsListStore {
	@observable events = [];
	@observable status = '';
	@observable freeOnly = false;
	@observable category = 0;


	@action fetchEvents(from, number) {
        this.status = 'fetching';
        axios.get('http://api.my-events.site/api/v1/events?limit=' + number + '&offset=' + from).then(this.succeedEventsFetch).catch(this.failEventsFetch);
	}

	@action.bound succeedEventsFetch(response) {
        this.status = 'succeeded';

        response.data.results.forEach(
            item => this.events.push(
                new EventsListItemModel(
                    item.id,
                    item.name,
                    item.uri,
                    item.logo_uri,
                    item.category,
                    item.organizer,
                    item.start_time,
                    item.finish_time,
                    item.max_ticket_price,
                    item.min_ticket_price,
                    item.ticket_price_currency
                )
            ));
	}

	@action.bound failEventsFetch(error) {
        this.status = 'failed';
    }

    @action setCategoryFilter(category) {
	    this.category = category;
    }

    @action setFreeOnly(value) {
        this.freeOnly = value;
    }
}
