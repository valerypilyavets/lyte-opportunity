import {action, observable} from "mobx";
import axios from "axios";
import CategoryModel from "../models/CategoryModel";

export default class CategoriesStore {
    @observable categories = [];
    @observable status = '';


    @action fetchCategories() {
        this.status = 'fetching';
        axios.get('http://api.my-events.site/api/v1/categories/').then(this.succeedCategoriesFetch).catch(this.failCategoriesFetch);
    }

    @action.bound succeedCategoriesFetch(response) {
        this.status = 'succeeded';

        response.data.results.forEach(
            item => this.categories.push(
                new CategoryModel(
                    item.id,
                    item.name
                )
            ));
    }

    @action.bound failCategoriesFetch(error) {
        this.status = 'failed';
    }
}