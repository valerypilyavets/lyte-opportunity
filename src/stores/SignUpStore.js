import {observable, action} from 'mobx';
import axios from "axios";

export default class SignUpStore {
    @observable status = '';
    @observable showSignUp = false;


    @action registerUser(email, password) {
        this.status = 'fetching';
        const data = {
            email: email,
            password: password
        };
        axios.post('http://api.my-events.site/api/v1/users/register', data).then(this.succeedRegisterUser).catch(this.failRegisterUser);
    }

    @action.bound succeedRegisterUser(response) {
        this.status = 'succeeded';
    }

    @action.bound failRegisterUser(error) {
        this.status = 'failed';
    }
}
