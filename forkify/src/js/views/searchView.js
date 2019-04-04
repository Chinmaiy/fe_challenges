import { elements, clear } from './base';

export const getInput = () => elements.searchInput.value;

const limitRecipeTitle = (title, limit = 17) => {
    if(title.length > limit) {
        const newTitle = title.split(' ')
            .reduce((acc, curr) => {
                if(acc.length + curr.length + 1 <= 17) {
                   return `${acc} ${curr}`; 
                }
                return acc;
            }, '');
        return `${newTitle} ...`;
    }
    return title;
};

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
}

export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
};

export const clearInput = () => { 
    elements.searchInput.value = ''
};

export const clearResultList = () => {
    clear(elements.searchResList);
};