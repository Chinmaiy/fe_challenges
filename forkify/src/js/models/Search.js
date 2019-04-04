import axios from 'axios';
import RecipeService from '../services/recipeService';

export default class Search {

    constructor(query) {
        this.query = query;
        this.recipeService = new RecipeService(true);
    }

    async getResults() {
        return await this.recipeService.getRecipes(this.query);
    }
}