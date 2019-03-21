

function addRow() {

    var rowsDiv = document.getElementsByClassName("table-rows")[0];
    var rowsNr = rowsDiv.children.length;
    rowsDiv.appendChild(createRow(rowsNr + 1, getColumnsMetadata()));
}

function getColumnsMetadata() {
    var metadata = [true, false, false];
    return metadata.map(isInput => {
        return {
            isInput: isInput,
            type: isInput ? "number" : ""
        };
    });
}

function createRow(rowNr, columnsMetadata) {
    var rowDiv = document.createElement('div');
    rowDiv.className = "table-row";

    var fstColumnDiv = document.createElement('div');
    fstColumnDiv.className = "table-cell";
    fstColumnDiv.innerText = rowNr;
    rowDiv.appendChild(fstColumnDiv);

    columnsMetadata.map(column => column.isInput ? createInputCell(column) : createEmptyCell())
        .forEach(cell => rowDiv.appendChild(cell));
    
    return rowDiv;
}

function createInputCell(column) {
    var inputCell = document.createElement("input");
    inputCell.className = "table-cell editable";
    inputCell.type = column.type;
    inputCell.addEventListener('change', (event) => {
        var input = event.target;
        var billValue = parseInt(input.value, 10);
        var billTip = getJohnsTipCalculator(billValue)(billValue);
        var total = billValue + billTip;

        var rowDiv = input.parentNode;
        var tipCell = rowDiv.getElementsByClassName('table-cell')[2];
        tipCell.innerText = `${billTip}$`;
        var totalCell = rowDiv.getElementsByClassName('table-cell')[3];
        totalCell.innerText = `${total}$`;
    });
    return inputCell;
}

function createEmptyCell() {
    var emptyCell = document.createElement("div");
    emptyCell.className = "table-cell";
    return emptyCell;
}

function getJohnsTipCalculator(bill) {
    switch(true) {
        case bill < 50:
            return sum => sum * 0.2;
        case bill < 200:
            return sum => sum * 0.15;
        default:
            return sum => sum * 0.1;
    }
}