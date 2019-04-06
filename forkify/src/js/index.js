import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";
import { elements, renderLoader, removeLoader, removeSelf } from "./views/base";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";

// Global app controller

/**
 * Global state of the app
 * - search object
 * - current recipe object
 * - shopping list object
 * - liked recipes
 */

 const state = {

 }

 /**
  * SEARCH CONTROLLER
  */
 const controlSearch = async () => {
    // 1. Get query from view
    const query = searchView.getInput();
    // 2. 
    if(query) {
        // 2. New search object + add to state
        state.search = new Search(query);
        // 3. Prepare UI for results
        window.location.hash = `#${query}`;
        searchView.clearInput();
        searchView.clearResultList();
        renderLoader(elements.searchRes);

        try {
            // 4. Search for recipes
            await state.search.getResults();
            // 5. Render results on UI
            removeLoader();
            searchView.renderResults(state.search.result);
        } catch(error) {
            alert('Something went wrong with the search...');
            removeLoader();
        }
    }
 }

 elements.searchForm.addEventListener('submit', event => {
    event.preventDefault(); //to not reload the page (default behavior for form)
    controlSearch();
 });

 elements.searchResPages.addEventListener('click', event => {
     const btn = event.target.closest('.btn-inline');
     if(btn) {
         const goToPage = parseInt(btn.dataset.goto, 10);
         searchView.clearResultList();
         searchView.renderResults(state.search.result, goToPage);
     }
 })

 /**
  * RECIPE CONTROLLER
  */

  const controlRecipe = async () => {
      // Get id from the URL
      const id = parseInt(window.location.hash.replace('#', ''));

      if(id) {
        // Create new recipe object
        state.recipe = new Recipe(id);
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        if(state.search) {
            searchView.highlightSelected(state.recipe.id);
        }
        try {
            // Get recipe data
            await state.recipe.getRecipe();
            
            // Render recipe
            removeLoader();
            recipeView.renderRecipe(state.recipe);
        } catch(error) {
            alert('Something went wront with retrieving the recipe...');
            console.log(error);
        }
      }
  }

['hashchange', 'load'].forEach(eventType => window.addEventListener(eventType, controlRecipe));

/**
 * LIST CONTROLLER
 */
const controlList = () => {
    if(!state.list) {
        state.list = new List();
    }

    state.recipe.ingredients.forEach(ing => {
        const item = state.list.addItem(ing);
        listView.renderItem(item);
    });
};

// Handling delete and update shopping list item event
elements.shoppingList.addEventListener('click', event => {
    const id = event.target.closest('.shopping__item').dataset.itemid;

    // handle delete
    if(event.target.matches('.shopping__delete, .shopping__delete *')) {
        //delete from state
        state.list.deleteItem(id);
        //delete from UI
        listView.deleteItem(id);
    } else if(event.target.matches('.shopping__count-value')) { //handle count update
        const val = parseFloat(event.target.value, 10);
        state.list.updateItem(id, val);
    }
});

// Handling recipe button clicks
elements.recipe.addEventListener('click', event => {
    if(event.target.matches('.btn-decrease, .btn-decrease *')) {
        if(state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if(event.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if(event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();
    }
});