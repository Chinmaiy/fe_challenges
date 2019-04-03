const dragStart = event => {
    event.dataTransfer.setData('card-id', event.target.id);
    // event.dataTransfer.dropEffect = 'copy';
    // event.dataTransfer.setDragImage(event.target, 0, 0);
    // console.info(event.target);
    // console.info(event.currentTarget);
};

const allowDrag = event => {
    event.preventDefault();
    event.currentTarget.style.background = "aqua";
}

const leave = event => {
    event.currentTarget.style.background = 'transparent';
}

const drop = event => {
    // event.preventDefault();
    // console.log(event.dataTransfer.types);
    // console.info(event.target);
    // console.info(event.currentTarget);
    event.currentTarget.style.background = 'transparent';
    var id = event.dataTransfer.getData('card-id');
    var elem = document.getElementById(id);
    if (event.ctrlKey)
    {
      var nodeCopy = elem.cloneNode(true);
      nodeCopy.id = `${id}-copy`; /* We cannot use the same ID */
      event.currentTarget.appendChild(nodeCopy);
    }
    else {
        try {
            event.currentTarget.appendChild(elem);
        } catch (err) {
            console.log(`Can't move here: ${err}`);
        }
    }

    event.stopPropagation();
}