export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResList: document.querySelector('.results__list')
};

export const clear = htmlElement => {
    while(htmlElement.lastChild) {
        htmlElement.removeChild(htmlElement.lastChild);
    }
};