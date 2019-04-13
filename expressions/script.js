const elements = {
    expressionsContainer: '.expressions-operations-container',
    expressionBuilder: '.expression-builder',
    expressionOperationWrapper: '.expression-operation-wrapper',
    expressionOperation: '.expression-operation',
    deleteExpressionBtn: '.far.fa-window-close'
};

const operations = {
    plus: '<i class="fas fa-plus"></i>',
    minus: '<i class="fas fa-minus"></i>',
    multiply:  '<i class="fas fa-times"></i>',
    divide: '<i class="fas fa-divide"></i>',
    constant: '<input type="number" class="expression-constant-value" placeholder="Value">',
    equals: '<i class="fas fa-equals"></i>',
    lte: '<i class="fas fa-less-than-equal"></i>',
    gte: '<i class="fas fa-greater-than-equal"></i>'
}

const getTime = () => {
    return (new Date()).toLocaleTimeString();
}

const isParenthesis = operation => {
    return operation === '(' || operation === ')';
}

const expressionOperationMarkup = (operation) => `
    <div class="expression-operation-wrapper">

        <div class="expression-operation ${isParenthesis(operation) ? 'parenthesis' : ''}">
            ${operations[operation] ? operations[operation] : operation}
        </div>

        <button class="expression-delete-btn"><i class="far fa-window-close"></i></button>
    </div>
`;

const clickOnExpressionsContainer = (event) => {

    if(event.target.matches(`${elements.expressionOperation}, ${elements.expressionOperation} *`)) {
        const operation = event.target.closest(elements.expressionOperation).dataset.operation;
        const html = expressionOperationMarkup(operation);
        document.querySelector(elements.expressionBuilder).insertAdjacentHTML('beforeend', html);
    }
};

[...document.querySelectorAll(elements.expressionsContainer)]
    .forEach(elem => {
        elem.addEventListener('click', clickOnExpressionsContainer);
});

const deleteExpression = (event) => {
    if(event.target.matches(elements.deleteExpressionBtn)) {
        const expWrapper = event.target.parentElement.parentElement;
        expWrapper.parentElement.removeChild(expWrapper);
    }
};

document.querySelector(elements.expressionBuilder)
    .addEventListener('click', deleteExpression);