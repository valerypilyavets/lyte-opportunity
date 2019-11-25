import React from 'react';
import {inject, observer} from 'mobx-react';
import {Modal, Form, Button, Alert} from 'react-bootstrap';
import Error from "./common/Error";
import Loading from "./common/Loading";

@inject("signUpStore")
@observer
export default class SignUpModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            validated: false
        }
    }

    handleInputChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;
        this.setState({
            ...this.state,
            validated: true
        });

        if (form.checkValidity()) {
            this.props.signUpStore.registerUser(
                this.state.email, this.state.password
            )
        }
    }

    onHide = () => {
        this.props.signUpStore.showSignUp = false;
        this.props.signUpStore.status = '';
        this.setState({
            ...this.state,
            email: '',
            password: '',
            validated: false
        });
    }

    render() {
        return (
            <Modal show={this.props.signUpStore.showSignUp} onHide={this.onHide} animation={false} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Sign up
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{display: this.props.signUpStore.status === 'succeeded' ? "block" : "none"}}>
                        <Alert variant="success">
                            Successfully registered. Log in to continue.
                        </Alert>
                    </div>
                    <div style={{display: this.props.signUpStore.status !== 'succeeded' ? "block" : "none"}}>
                        <Error display={this.props.signUpStore.status === 'failed'} />
                        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control disabled={this.props.signUpStore.status === 'fetching'} required type="email" onChange={this.handleInputChange} name="email" value={this.state.email}/>
                                <Form.Control.Feedback type="invalid">
                                    Enter a valid email
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control disabled={this.props.signUpStore.status === 'fetching'} required type="password" onChange={this.handleInputChange} name="password" value={this.state.password}/>
                                <Form.Control.Feedback type="invalid">
                                    Password is required
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Loading display={this.props.signUpStore.status === 'fetching'}/>
                            <div style={{display: this.props.signUpStore.status !== 'fetching' ? "block" : "none"}}>
                                <Button block type="submit" variant="primary">Sign up</Button>
                            </div>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}
