import RecipeService from "../services/recipeService";

export default class Recipe {
    constructor(id) {
        this.id = id;
        this.recipeService = new RecipeService(true);
    }

    async getRecipe() {
        const result = await this.recipeService.getRecipe(this.id);
        this.title = result.title;
        this.author = result.publisher;
        this.img = result.image_url;
        this.url = result.source_url;
        this.ingredients = result.ingredients;
        this.calcTime();
        this.calcServings();
    }

    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }
}

