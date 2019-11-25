import React from 'react';
import {inject, observer} from 'mobx-react';
import {Modal, Form, Button} from 'react-bootstrap';
import Loading from "./common/Loading";
import Error from "./common/Error";

@inject("logInStore")
@observer
export default class LogInModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            validated: false,
            status: ''
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.logInStore.status !== prevState.status) {
            return {status: nextProps.logInStore.status};
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.status === 'succeeded' && prevState.status !== this.state.status) {
            this.onHide();
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
            this.props.logInStore.fetchToken(
                this.state.username, this.state.password
            )
        }
    }

    onHide = () => {
        this.props.logInStore.showLogIn = false;
        this.props.logInStore.status = '';
        this.setState({
            ...this.state,
            username: '',
            password: '',
            validated: false
        });
    }

    render() {
        return (
            <Modal show={this.props.logInStore.showLogIn} onHide={this.onHide} animation={false} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Log in
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <Error display={this.props.logInStore.status === 'failed'} />
                        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control required type="email" onChange={this.handleInputChange} name="username" value={this.state.username}/>
                                <Form.Control.Feedback type="invalid">
                                    Username should be a valid email
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control required type="password" onChange={this.handleInputChange} name="password" value={this.state.password}/>
                                <Form.Control.Feedback type="invalid">
                                    Password is required
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Loading display={this.props.logInStore.status === 'fetching'}/>
                            <div style={{display: this.props.logInStore.status !== 'fetching' ? "block" : "none"}}>
                                <Button block type="submit" variant="primary">Log in</Button>
                            </div>
                        </Form>
                </Modal.Body>
            </Modal>
        );
    }
}
