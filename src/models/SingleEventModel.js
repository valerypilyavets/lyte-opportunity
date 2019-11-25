import moment from "moment";

export default class SingleEventModel {
    constructor(id, name, description, uri, logoUri, category, organizer, startTime, finishTime, maxTicketPrice, minTicketPrice, ticketPriceCurrency) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.uri = uri;
        this.logoUri = logoUri;
        this.category = category;
        this.organizer = organizer;
        this.startTime = startTime;
        this.finishTime = finishTime;
        this.maxTicketPrice = maxTicketPrice;
        this.minTicketPrice = minTicketPrice;
        this.ticketPriceCurrency = ticketPriceCurrency;
    }

    static get dateFormat() {
        return 'dddd MMMM Do';
    }

    static get emptyCategory() {
        return 'n/a';
    }

    static get freeEvent() {
        return 'Free';
    }

    get categoryId() {
        return this.category ? this.category.id : null;
    }

    get categoryName() {
        return this.category ? this.category.name : SingleEventModel.emptyCategory
    }

    get organizerName() {
        return this.organizer ? this.organizer.name : SingleEventModel.emptyCategory
    }

    get date() {
        const from = moment(this.startTime);
        const to = moment(this.finishTime);

        if (to.diff(from, 'hours') < 24) {
            return from.format(SingleEventModel.dateFormat)
        } else {
            return from.format(SingleEventModel.dateFormat) + ' — ' + to.format(SingleEventModel.dateFormat);
        }
    }

    get price() {
        const min = Number(this.minTicketPrice);
        const max = Number(this.maxTicketPrice);

        if (min === 0 && max === 0) {
            return SingleEventModel.freeEvent;
        } else if (min === 0) {
            return max.toFixed(2) + ' ' + this.ticketPriceCurrency;
        } else {
            return min.toFixed(2) + ' ' + this.ticketPriceCurrency + ' — ' + max.toFixed(2) + ' ' + this.ticketPriceCurrency;
        }
    }
}