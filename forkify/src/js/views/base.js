export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list')
};

export const elementsStrings = {
    loader: 'loader'
}

export const clear = htmlElement => {
    while(htmlElement.lastChild) {
        htmlElement.removeChild(htmlElement.lastChild);
    }
};

export const removeSelf = htmlElement => {
    htmlElement && htmlElement.parentElement.removeChild(htmlElement);
}

export const renderLoader = parentElement => {
    const loader = `
        <div class="${elementsStrings.loader}">
            <svg>
                <use href="../img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;

    parentElement.insertAdjacentHTML('afterbegin', loader);
};

export const removeLoader = () => {
    const loader = document.querySelector(`.${elementsStrings.loader}`);
    removeSelf(loader);
};