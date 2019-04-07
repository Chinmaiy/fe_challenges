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
        this.parseIngredients();
    }

    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 
                            'teaspoon', 'teaspoons', 'cups', 'pounds',
                            'slices', 'cans'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound', 'slice', 'can'];
        const units = [...unitsShort, 'kg', 'g'];

        this.ingredients = this.ingredients.map(element => {
            // Uniform ingredients
            let ingredient = element.toLowerCase();
            unitsLong.forEach((unit, idx) => {
                ingredient = ingredient.replace(unit, unitsShort[idx]);
            });
            // Remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
            // Parse ingredients count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIdx = arrIng.findIndex(word => units.includes(word));

            let objIng;
            if(unitIdx > -1) {
                // there is a unit
                const arrCount = arrIng.splice(0, unitIdx); // e.g.: [4, 1/2] or [4] or [1-1/3]
                let count;
                if(arrCount.length > 1) {
                    count = eval(arrCount.join('+'));
                } else {
                    count = eval(arrCount[0].replace('-', '+')); //replace added to cover last case
                }

                const unit = arrIng.splice(0, 1)[0];

                objIng = {
                    count,
                    unit,
                    ingredient: arrIng.join(' ')
                }
            } else if(parseInt(arrIng[0], 10)) {
                // no unit, but 1st element is a number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if(unitIdx === -1) {
                // no unit and no number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return objIng;
        });
    }

    updateServings(updateType) {
        // Servings
        const newServings = updateType === 'dec' ? this.servings - 1 : this.servings + 1;

        // Ingredients
        this.ingredients.forEach(ing => {
            ing.count *= (newServings / this.servings);
        });

        this.servings = newServings;
    }
}

