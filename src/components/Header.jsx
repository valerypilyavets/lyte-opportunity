import React from 'react';
import {observer, inject} from 'mobx-react';
import {ButtonToolbar, Button} from "react-bootstrap";
import SignUpModal from "./SignUpModal";
import LogInModal from "./LogInModal";


@inject("logInStore", "signUpStore")
@observer
export default class FreeOnlyFilter extends React.Component {
    handleLogInClick = () => {
        this.props.logInStore.showLogIn = true;
    }

    handleSignUpClick = () => {
        this.props.signUpStore.showSignUp = true;
    }

    handleLogOutClick = () => {
        this.props.logInStore.logOut();
    }

    render() {
        return (
            <div>
                <div style={{display: this.props.logInStore.token ? "block" : "none"}}>
                    <ButtonToolbar className="d-flex flex-row-reverse">
                        <Button onClick={this.handleLogOutClick} variant="secondary" size="sm">Log out</Button>
                    </ButtonToolbar>
                </div>
                <div style={{display: !this.props.logInStore.token ? "block" : "none"}}>
                    <ButtonToolbar className="d-flex flex-row-reverse">
                        <Button onClick={this.handleSignUpClick} variant="secondary" size="sm">Sign up</Button>&nbsp;
                        <Button onClick={this.handleLogInClick} variant="secondary" size="sm">Log in</Button>
                    </ButtonToolbar>
                </div>
                <LogInModal/>
                <SignUpModal/>
            </div>
        );
    }
}
