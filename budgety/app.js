// BUDGET CONTROLLER
var budgetController = (function () {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(income) {
        if(income > 0) {
            this.percentage = Math.round((this.value / income) * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    }

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = type => {
        data.total[type] = data.allItems[type].reduce((acc, curr) => acc + curr.value, 0);
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        total: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: ({type, description, value}) => {
            // Create new id
            var collection = data.allItems[type];
            var size = collection.length;
            var id = size === 0 ? 0 : collection[size - 1].id + 1;

            // Create new item
            var constructor = type === 'exp' ? Expense : Income;
            var newItem = new constructor(id, description, value);

            // Push it to the stored data
            data.allItems[type].push(newItem);
            return newItem;
        },

        deleteItem: (type, id) => {
            var index = data.allItems[type].findIndex(curr => curr.id === id);
            if(index || index === 0) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: () => {
            // Calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            // Calculate the budget: income - expenses
            data.budget = data.total.inc - data.total.exp;
            // Calculate the percentage of the spent income
            if(data.total.inc > 0) {
                data.percentage = Math.round((data.total.exp / data.total.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        calculatePercentages: () => {
            data.allItems.exp.forEach(curr => curr.calcPercentage(data.total.inc));
        },

        getBudget: () => {
            return {
                budget: data.budget,
                totalInc: data.total.inc,
                totalExp: data.total.exp,
                percentage: data.percentage
            }
        },

        getPercentages: () => {
            return data.allItems.exp.map(curr => curr.getPercentage());
        },

        testing: () => {
            console.log(data);
        }
    }

})();


// UI CONTROLLER
var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        item: '.item',
        expensePercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };

    var getValueOf = querySelector => {
        return document.querySelector(querySelector).value;
    };

    String.prototype.render = function (placeholder, value) {
        return this.replace(placeholder, value);
    };

    var formatPercentage = percentage => {
        return percentage > 0 ? `${percentage}%` : '---';
    };

    var formatNumber = (num, type) => {
        if(!type) {
            type = num < 0 ? 'exp' : 'inc';
        }
        num = Math.abs(num);
        num = num.toFixed(2);

        [integer, decimal] = num.split('.');
        var groupsNr = Math.floor(integer.length / 3);
        var rest = integer.length % 3;
        var groups = [];
        groups.push(integer.slice(0, rest));
        for(var i = 0; i < groupsNr; ++i) {
            var start = i * 3 + rest;
            groups.push(integer.slice(start, start + 3));
        }
        var commaSeparated = groups.reduce((acc, curr) => acc + ',' + curr);
        
        return (type === 'exp' ? '-' : '+') + ' ' + commaSeparated + '.' + decimal;
    };

    return {
        getInput: () => {
            return {
                type: getValueOf(DOMstrings.inputType), // either inc or exp
                description: getValueOf(DOMstrings.inputDescription),
                value: parseFloat(getValueOf(DOMstrings.inputValue))
            }
        },

        addListItem: ({id, description, value}, type) => {
            // Create HTML string with placeholder text
            var html, container;
            if(type === 'inc') {
                container = DOMstrings.incomeContainer;
                html = '<div class="item" id="inc-%id%"><div class="item__description">%description%</div><div class="right"><div class="item__value">%value%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            } else if(type === 'exp') {
                container = DOMstrings.expensesContainer;
                html = '<div class="item" id="exp-%id%"><div class="item__description">%description%</div><div class="right"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            // Replace the placeholder text with some actual data
            var newHtml = html.render('%id%', id)
                                .render('%description%', description)
                                .render('%value%', formatNumber(value, type));
            // Insert the HTML into the DOM
            document.querySelector(container)
                    .insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: id => {
            var element = document.getElementById(id);
            element.parentNode.removeChild(element);
        },

        clearInput: () => {
            var inputs = document.querySelectorAll(`${DOMstrings.inputDescription}, ${DOMstrings.inputValue}`);
            [...inputs].forEach(elem => elem.value = '');
            inputs[0].focus();
        },

        displayBudget: ({budget, totalInc, totalExp, percentage}) => {
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(budget);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(totalInc);
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(totalExp);
            document.querySelector(DOMstrings.percentageLabel).textContent = formatPercentage(percentage);
        },

        displayPercentages: (percentages) => {
            document.querySelectorAll(DOMstrings.expensePercentageLabel)
                    .forEach((element, idx) => element.textContent = formatPercentage(percentages[idx]));

        },

        displayMonth: () => {
            var now = new Date();
            var year = now.getFullYear();

            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var month = now.getMonth();
            
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
        },

        changedType: () => {
            document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue
            ).forEach(element => {
                element.classList.toggle('red-focus');
            })

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        },

        getDOMstrings: () => DOMstrings
    };
})();


//GLOBAL APP CONTROLLER - delegates task to the other controllers
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = () => {
        var DOMstrings = UICtrl.getDOMstrings();

        document.querySelector(DOMstrings.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', event => {
            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        //event delegation i.e. add the event handler on the container of all the elements you want to react to this event
        document.querySelector(DOMstrings.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOMstrings.inputType).addEventListener('change', UICtrl.changedType);
    };

    var isValidInput = input => {
        return input.description !== '' && !isNaN(input.value) && input.value > 0;
    }

    var updateBudget = () => {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();
        // 2. Return the budget
        var budget = budgetCtrl.getBudget();
        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };

    var updatePercentages = () => {
        // 1. Calculate percentages
        budgetController.calculatePercentages();
        // 2. Read percentages from the budget controller
        var percentages = budgetController.getPercentages();
        // 3. Update the UI 
        UICtrl.displayPercentages(percentages);
    }

    var ctrlAddItem = () => {
        // 1. Get the filled input data
        var input = UICtrl.getInput();
        if(isValidInput(input)) {
            // 2. Add the item to the budget controller
            var newItem = budgetCtrl.addItem(input);
            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);
            // 4. Clear filled input data
            UICtrl.clearInput();
            // 5. Calculate and update budget
            updateBudget();
            // 6. Calculate and update percentages
            updatePercentages();
        }
    };

    var ctrlDeleteItem = event => {
        var itemId = event.target.closest(UICtrl.getDOMstrings().item).id;
        if(itemId) {
            var [ type, id ] = itemId.split('-');
            id = parseInt(id);

            // 1. Delete from data
            budgetCtrl.deleteItem(type, id);
            // 2. Detele from UI
            UICtrl.deleteListItem(itemId);
            // 3. Update and show the new budget
            updateBudget();
            // 4. Calculate and update percentages
            updatePercentages();
        }
    };

    return {
        init: () => {
            UICtrl.displayMonth();
            UICtrl.displayBudget(budgetController.getBudget());
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();