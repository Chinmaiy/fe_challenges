import RecipeService from '../services/recipeService';

export default class Search {

    constructor(query) {
        this.query = query;
        this.recipeService = new RecipeService(true);
    }

    async getResults() {
        this.result = await this.recipeService.getRecipes(this.query);
    }
}