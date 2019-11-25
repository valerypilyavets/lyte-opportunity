import React from 'react';
import {observer, inject} from 'mobx-react';
import {Form} from "react-bootstrap";


@inject("categoriesStore", "eventsListStore")
@observer
export default class FreeOnlyFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    }

    handleChange = () => {
        this.setState({checked: event.target.checked}, () => {
            this.props.eventsListStore.setFreeOnly(this.state.checked);
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.eventsListStore.freeOnly !== this.state.checked) this.setState({checked: nextProps.eventsListStore.freeOnly})
    }

    render() {

        return (
            <div>
                <Form>
                    <Form.Group>
                        <Form.Check checked={this.state.checked} onChange={this.handleChange} type="checkbox" label="Show free events only" />
                    </Form.Group>
                </Form>
            </div>
        );
    }
}
