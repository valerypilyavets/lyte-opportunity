import React from 'react';
import {inject, observer} from 'mobx-react';
import {Modal, Form, Col, Row, Button} from 'react-bootstrap';

@inject("singleEventStore")
@observer
export default class EditEventModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            uri: '',
            logoUri: '',
            validated: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.singleEventStore.event.name,
            uri: nextProps.singleEventStore.event.uri,
            logoUri: nextProps.singleEventStore.event.logoUri,
        });
    }

    handleInputChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;
        this.setState({
            ...this.state,
            validated: true
        });

        if (form.checkValidity()) {
            this.props.singleEventStore.editEvent(this.state.name, this.state.uri, this.state.logoUri)
        }
    }

    onHide = () => {
        this.props.singleEventStore.isEditing = false;
        this.props.singleEventStore.status = '';
        this.setState({
            name: this.props.singleEventStore.event.name,
            uri: this.props.singleEventStore.event.uri,
            logoUri: this.props.singleEventStore.event.logoUri,
        });
    }

    render() {
        return (
            <Modal show={this.props.singleEventStore.isEditing} onHide={this.onHide} animation={false} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit event
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={this.state.validated} onSubmit={this.onSubmit}>
                        <Form.Group as={Row} controlId="name">
                            <Form.Label column sm={2}>
                                Name
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control required type="text" onChange={this.handleInputChange} name="name"
                                              value={this.state.name}/>
                                <Form.Control.Feedback type="invalid">
                                    Event name is required
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="uri">
                            <Form.Label column sm={2}>
                                URI
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" onChange={this.handleInputChange} name="uri"
                                              value={this.state.uri}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="logoUri">
                            <Form.Label column sm={2}>
                                Image URI
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" onChange={this.handleInputChange} name="logoUri"
                                              value={this.state.logoUri}/>
                            </Col>
                        </Form.Group>
                        <Button block type="submit" variant="danger">Save</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}
