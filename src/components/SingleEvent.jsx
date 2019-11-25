import React from 'react';
import {inject, observer} from 'mobx-react';
import {Card, Row, Col, ButtonToolbar, Image, Badge, Button, Alert} from "react-bootstrap";
import EditEventModal from './EditEventModal';

@inject("singleEventStore", "logInStore")
@observer
export default class SingleEvent extends React.Component {
    constructor(props) {
        super(props);
    }

    handleEditClick = () => {
        this.props.singleEventStore.isEditing = true;
    }

    render() {
        const display = this.props.display ? "block" : "none";

        const cssImagesFix = `
             img {
                 max-width: 100%;
             }`;

        return (
            <div style={{display: display}}>
                <style>{cssImagesFix}</style>
                <Row>
                    <Col sm={2}>
                        <Button href="/" variant="primary">&larr; To events list</Button>
                    </Col>
                    <Col sm={8}>
                        <h1 className="text-center">{this.props.singleEventStore.event.name}</h1>
                    </Col>
                    <Col sm={2}>

                    </Col>
                </Row>
                <br/>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col sm={4}>
                                <Image src={this.props.singleEventStore.event.logoUri} rounded fluid/>
                                <br/> <br/>
                                <Card.Title>
                                    <b>Category: </b><span>{this.props.singleEventStore.event.categoryName}</span> <br/>
                                    <b>Organizer: </b><span>{this.props.singleEventStore.event.organizerName}</span>
                                </Card.Title>
                                <br/>
                                <Card.Subtitle
                                    className="mb-2 text-muted">{this.props.singleEventStore.event.date}</Card.Subtitle>
                                <Card.Text>
                                    <Badge variant="info">
                                        Tickets: <b>{this.props.singleEventStore.event.price}</b>
                                    </Badge>
                                </Card.Text>
                                <div style={{display: this.props.logInStore.token ? "block" : "none"}}>
                                    <ButtonToolbar>
                                        <Button block onClick={this.handleEditClick} variant="danger">Edit event</Button>
                                    </ButtonToolbar>
                                </div>
                                <div style={{display: !this.props.logInStore.token ? "block" : "none"}}>
                                    <Alert variant="info">Log in to edit event</Alert>
                                </div>

                            </Col>
                            <Col sm={8}>
                                <div dangerouslySetInnerHTML={{__html: this.props.singleEventStore.event.description}}/>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <EditEventModal/>
            </div>
        );
    }
}