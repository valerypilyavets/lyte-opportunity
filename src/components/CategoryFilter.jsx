import React from 'react';
import {observer, inject} from 'mobx-react';
import {Button, Form, Col, Row} from "react-bootstrap";

@inject("categoriesStore", "eventsListStore")
@observer
export default class EventsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '0'
        }
    }

    componentDidMount() {
        this.props.categoriesStore.fetchCategories();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.eventsListStore.category !== parseInt(this.state.value)) {
            this.setState({value: "0"}, () => {
                this.props.eventsListStore.setCategoryFilter(0);
            })
        }
    }

    handleChange = () => {
        this.setState({value: event.target.value}, () => {
            this.props.eventsListStore.setCategoryFilter(parseInt(this.state.value));
        });
    }

    handleCancelCategoryFilter = () => {
        this.setState({value: "0"}, () => {
            this.props.eventsListStore.setCategoryFilter(0);
        });
    }

    render() {
        const display = this.props.display ? "block" : "none";

        return (
            <div style={{display: display}}>
                <Form as={Row}>
                    <Col sm={6}>
                        <Form.Group controlId="">
                            <Form.Control as="select" value={this.state.value} onChange={this.handleChange}>
                                <option value="0">Select Category</option>
                                {this.props.categoriesStore.categories.map((category, index) => {
                                    return <option key={index} value={category.id}>{category.name}</option>;
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col sm={2}>
                        <Button onClick={this.handleCancelCategoryFilter} variant="primary">Cancel filter</Button>
                    </Col>
                </Form>
            </div>
        );
    }
}
