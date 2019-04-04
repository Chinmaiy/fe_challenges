import Search from "./models/Search";
import { elements, renderLoader, removeLoader } from "./views/base";
import * as searchView from "./views/searchView";

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

 const controlSearch = async () => {
    // 1. Get query from view
    const query = searchView.getInput();
    // 2. 
    if(query) {
        // 2. New search object + add to state
        state.search = new Search(query);
        // 3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResultList();
        renderLoader(elements.searchRes);
        // 4. Search for recipes
        await state.search.getResults();
        // 5. Render results on UI
        removeLoader();
        searchView.renderResults(state.search.result);
    }
 }

 elements.searchForm.addEventListener('submit', event => {
    event.preventDefault(); //to not reload the page (default behavior for form)
    controlSearch();
 });