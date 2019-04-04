import axios from 'axios';
import properties from '../resources/properties';

export default class RecipeService {
    
    constructor(isMock = false) {
        this.isMock = isMock;
    }

    async getRecipes(query) {
        if(!this.isMock) {
            const proxy = '';
            try {
                const res = await axios(`${proxy}http://food2fork.com/api/search?key=${properties.apiKey}&q=${this.query}`);
                return res.data.recipes;
            } catch(error) {
                console.log(error);
            }
        } 
        return await this.getMockRecipes(query);
    }

    getMockRecipes(query) {

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const recipes = [
                    {
                        "publisher": "Allrecipes.com",
                        "social_rank": 99.81007979198002, 
                        "f2f_url": "https://www.food2fork.com/recipes/view/29159", 
                        "publisher_url": "http://allrecipes.com", 
                        "title": "Slow-Cooker Chicken Tortilla Soup", 
                        "source_url": "http://allrecipes.com/Recipe/Slow-Cooker-Chicken-Tortilla-Soup/Detail.aspx",
                        "page":1
                    }
                ];
                resolve(recipes);
            }, 1500);
        })
    }
};