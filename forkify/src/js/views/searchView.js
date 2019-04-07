import { elements, clear, limitRecipeTitle } from './base';

export const getInput = () => elements.searchInput.value;

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

const createButtonMarkup = (page, navType) => `
    <button class="btn-inline results__btn--${navType}"
            data-goto=${navType === 'prev' ? page - 1 : page + 1}>
        <span>Page ${navType === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${navType === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, resPerPage, numResults) => {
    const pages = Math.ceil(numResults / resPerPage);

    let buttonMarkup;
    if(pages >  1) {
        switch(page) {
            case 1:
                buttonMarkup = createButtonMarkup(page, 'next'); break;
            case pages:
                buttonMarkup = createButtonMarkup(page, 'prev'); break;
            default:
                buttonMarkup = `
                    ${createButtonMarkup(page, 'next')}
                    ${createButtonMarkup(page, 'prev')}
                `;
        }
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', buttonMarkup);
};

export const renderResults = (recipes, page = 1, resPerPage = 2) => {
    // render results of current page
    const start = (page - 1) * resPerPage;
    const end = start + resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    // render pagination buttons
    renderButtons(page, resPerPage, recipes.length);
};

export const clearInput = () => { 
    elements.searchInput.value = ''
};

export const clearResultList = () => {
    clear(elements.searchResList);
    clear(elements.searchResPages);
};

export const highlightSelected = id => {
    [...document.querySelectorAll('.results__link')].forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
};