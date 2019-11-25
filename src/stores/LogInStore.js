import {observable, computed, reaction, action} from 'mobx';
import axios from "axios";
import Cookies from 'js-cookie';

export default class LogInStore {
    @observable status = '';
    @observable showLogIn = false;
    @observable token = Cookies.get('auth-token') || null;


    @action fetchToken(email, password) {
        this.status = 'fetching';
        const data = {
            username: email,
            password: password
        };

        axios.post('http://api.my-events.site/api/v1/users/token/', data).then(this.succeedTokenFetch).catch(this.failTokenFetch);
    }

    @action.bound succeedTokenFetch(response) {
        this.status = 'succeeded';
        this.token = response.data.token;
        Cookies.set('auth-token', response.data.token);
    }

    @action.bound failTokenFetch(error) {
        this.status = 'failed';
    }

    @action logOut() {
        Cookies.remove('auth-token');
        this.token = null;
    }
}
