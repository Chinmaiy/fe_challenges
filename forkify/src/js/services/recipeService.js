import axios from 'axios';
import properties from '../resources/properties';

const proxy = '';
const apiBaseUrl = 'http://food2fork.com/api/';

const getMockRecipes = query => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const recipes = [
                {
                    "recipe_id": 29159,
                    "publisher": "Allrecipes.com",
                    "social_rank": 99.81007979198002, 
                    "f2f_url": "https://www.food2fork.com/recipes/view/29159", 
                    "publisher_url": "http://allrecipes.com", 
                    "title": "Slow-Cooker Chicken Tortilla Soup", 
                    "source_url": "http://allrecipes.com/Recipe/Slow-Cooker-Chicken-Tortilla-Soup/Detail.aspx",
                    "image_url": "https://images-gmi-pmc.edge-generalmills.com/aaa0a6db-9aa1-4c1d-acb5-f258185e990f.jpg",
                    "page":1
                },
                {
                    "recipe_id": 35382,
                    "publisher": "closetcooking.com",
                    "social_rank": 100.0, 
                    "f2f_url": "https://www.food2fork.com/recipes/view/35382", 
                    "publisher_url": "https://www.closetcooking.com", 
                    "title": "Jalapeno Popper Grilled Cheese Sandwich", 
                    "source_url": "https://www.closetcooking.com/jalapeno-popper-grilled-cheese-sandwich/",
                    "image_url": "http://static.food2fork.com/Jalapeno2BPopper2BGrilled2BCheese2BSandwich2B12B500fd186186.jpg",
                    "page":1
                },
                {
                    "recipe_id": 34889,
                    "publisher": "Allrecipes.com",
                    "social_rank": 100.0, 
                    "f2f_url": "https://www.food2fork.com/view/Zesty_Slow_Cooker_Chicken_Barbeque/34889", 
                    "publisher_url": "http://allrecipes.com", 
                    "title": "Zesty Slow Cooker Chicken Barbeque", 
                    "source_url": "http://allrecipes.com/Recipe/Zesty-Slow-Cooker-Chicken-Barbecue/Detail.aspx",
                    "image_url": "http://static.food2fork.com/4515542dbb.jpg",
                    "page":1
                },
                {
                    "recipe_id": 46956,
                    "publisher": "thepioneerwoman.com",
                    "social_rank": 100.0, 
                    "f2f_url": "https://www.food2fork.com/view/Deep_Dish_Fruit_Pizza/46956", 
                    "publisher_url": "http://thepioneerwoman.com", 
                    "title": "Deep Dish Fruit Pizza", 
                    "source_url": "http://thepioneerwoman.com/cooking/2012/01/fruit-pizza/",
                    "image_url": "http://static.food2fork.com/fruitpizza9a19.jpg",
                    "page":1
                }
            ];
            resolve(recipes);
        }, 1500);
    });
};

const getMockRecipe = id => {
    return new Promise((resolve, reject) => {
        setTimeout(id => {
            let recipe;
            switch(id) {
                case 29159: recipe = {
                    "recipe_id": 29159,
                    "publisher": "All Recipes",
                    "social_rank": 99.81007979198002, 
                    "f2f_url": "https://www.food2fork.com/recipes/view/29159", 
                    "title": "Slow-Cooker Chicken Tortilla Soup", 
                    "source_url": "http://allrecipes.com/Recipe/Slow-Cooker-Chicken-Tortilla-Soup/Detail.aspx",
                    "image_url": "https://images-gmi-pmc.edge-generalmills.com/aaa0a6db-9aa1-4c1d-acb5-f258185e990f.jpg",
                    "ingredients": [
                        "1 pound shredded, cooked chicken",
                        "1 (15 ounce) can whole peeled tomatoes, mashed",
                        "1 (10 ounce) can enchilada sauce",
                        "1 medium onion, chopped",
                        "1 (4 ounce) can chopped green chile peppers",
                        "2 cloves garlic, minced",
                        "2 cups water",
                        "1 (14.5 ounce) can chicken broth",
                        "1 teaspoon cumin",
                        "1 teaspoon chili powder",
                        "1 teaspoon salt",
                        "1/4 teaspoon black pepper",
                        "1 bay leaf",
                        "1 (10 ounce) package frozen corn",
                        "1 tablespoon chopped cilantro",
                        "7 corn tortillas",
                        "vegetable oil"
                    ]
                }; break;
                case 35382: recipe = {
                    "recipe_id": 35382,
                    "publisher": "Closet Cooking",
                    "social_rank": 100.0, 
                    "f2f_url": "https://www.food2fork.com/recipes/view/35382", 
                    "publisher_url": "https://www.closetcooking.com", 
                    "title": "Jalapeno Popper Grilled Cheese Sandwich", 
                    "source_url": "https://www.closetcooking.com/jalapeno-popper-grilled-cheese-sandwich/",
                    "image_url": "http://static.food2fork.com/Jalapeno2BPopper2BGrilled2BCheese2BSandwich2B12B500fd186186.jpg",
                    "ingredients": [
                        "2 jalapeno peppers, cut in half lengthwise and seeded",
                        "2 slices sour dough bread",
                        "1 tablespoon butter, room temperature",
                        "2 tablespoons cream cheese, room temperature",
                        "1/2 cup jack and cheddar cheese, shredded",
                        "1 tablespoon tortilla chips, crumbled"
                    ]
                }; break;
                case 34889: recipe = {
                    "recipe_id": 34889,
                    "publisher": "All Recipes",
                    "social_rank": 100.0, 
                    "f2f_url": "https://www.food2fork.com/view/Zesty_Slow_Cooker_Chicken_Barbeque/34889", 
                    "publisher_url": "http://allrecipes.com", 
                    "title": "Zesty Slow Cooker Chicken Barbeque", 
                    "source_url": "http://allrecipes.com/Recipe/Zesty-Slow-Cooker-Chicken-Barbecue/Detail.aspx",
                    "image_url": "http://static.food2fork.com/4515542dbb.jpg",
                    "ingredients": [
                        "6 frozen skinless, boneless chicken breast halves",
                        "1 (12 ounce) bottle barbeque sauce",
                        "1/2 cup Italian salad dressing",
                        "1/4 cup brown sugar",
                        "2 tablespoons Worcestershire sauce"
                    ]
                }; break;
                case 46956: recipe = {
                    "recipe_id": 46956,
                    "publisher": "thepioneerwoman.com",
                    "social_rank": 100.0, 
                    "f2f_url": "https://www.food2fork.com/view/Deep_Dish_Fruit_Pizza/46956", 
                    "publisher_url": "http://thepioneerwoman.com", 
                    "title": "Deep Dish Fruit Pizza", 
                    "source_url": "http://thepioneerwoman.com/cooking/2012/01/fruit-pizza/",
                    "image_url": "http://static.food2fork.com/fruitpizza9a19.jpg",
                    "ingredients": [
                        "1-1/3 cup Shortening (may Substitute Butter)",
                        "1-1/2 cup Sugar",
                        "1 teaspoon Orange Zest",
                        "1 teaspoon Vanilla",
                        "2 whole Eggs",
                        "8 teaspoons Whole Milk",
                        "4 cups All-purpose Flour",
                        "3 teaspoons Baking Powder",
                        "1/2 teaspoon Salt",
                        "2 jars (13 Ounces Each) Marshmallow Creme",
                        "2 packages (8 Ounces Each) Cream Cheese",
                        "Peaches",
                        "Kiwi Fruit",
                        "Blueberries",
                        "Pears",
                        "Raspberries",
                        "Other Fruit Optional"
                    ]
                }; break;
            }
            resolve(recipe);
        }, 1000, id);
    });
};

const handleError = error => {
    console.log(error);
};

export default class RecipeService {
    
    constructor(isMock = false) {
        this.isMock = isMock;
    }

    async getRecipes(query) {
        if(!this.isMock) {
            try {
                const res = await axios(`${proxy}${apiBaseUrl}search?key=${properties.apiKey}&q=${this.query}`);
                return res.data.recipes;
            } catch(error) {
                handleError(error);
            }
        } 
        return getMockRecipes(query);
    }

    async getRecipe(id) {
        if(!this.isMock) {
            try {
                const res = await axios(`${proxy}${apiBaseUrl}get?key=${properties.apiKey}&rId=${id}`);
                return res.data.recipe;
            } catch(error) {
                handleError(error);
            }
        }
        return getMockRecipe(id);
    }
};