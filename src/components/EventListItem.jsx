import React from 'react';
import {observer} from 'mobx-react';
import {Card, Badge} from 'react-bootstrap';

@observer
export default class EventsListItem extends React.Component {

    render() {
        const {event} = this.props;

        return (
            <Card>
                <Card.Img variant="top" src={event.logoUri} />
                <Card.Body>
                    <Card.Title>{event.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{event.date}</Card.Subtitle>
                    <Card.Text>
                        <Badge variant="info">
                            Tickets: <b>{event.price}</b>
                        </Badge>

                    </Card.Text>
                    <Card.Link href={"/event/" + event.id}>More &rarr;</Card.Link>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">
                        <b>Category: </b><span>{event.categoryName}</span> <br/>
                        <b>Organizer: </b><span>{event.organizerName}</span>
                        </small>
                </Card.Footer>
            </Card>
        );
    }
}
