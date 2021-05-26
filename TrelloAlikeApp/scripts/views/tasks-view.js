class TasksView {
    constructor(mainId, listId, btnId) {
        this._mainId = mainId;
        this._listId = listId;
        this._btnId = btnId;
    }

    displayMain(boardName) {
        const main = document.getElementById(this._mainId);
        main.innerHTML = `<h2 class="text_blue">${boardName}</h2>
        <div id="${this._listId}" class="column-list">
            <button id="${this._btnId}" class="button button_green">
                <i class="fa fa-plus" aria-hidden="true"></i>
                Add column
            </button>
        </div>`;
    }

    displayTasks(col) {
        const lst = document.getElementById(this._listId);
        const btn = document.getElementById(this._btnId);
        while (lst.firstElementChild.id !== this._btnId) {
            lst.removeChild(lst.firstElementChild);
        }
        for(let item of col) {
            const column = document.createElement('section');
            column.setAttribute('class', 'column-list__item');
            column.setAttribute('id', item.id);
            column.innerHTML = `
                <div id="${item.id}-title" class="row-container">
                    <h3 class="text_blue">${item.name}</h3>
                    <button id="${item.id}-D" class="icon-button icon-button_blue icon-button_shifted">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                    <button id="${item.id}-E" class="icon-button icon-button_blue">
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                </div>
    
                <div id="${item.id}-L" class="task-list">
                    ${item.get_all().map((elem) => 
                        `<article id="${elem.id}" draggable="true" 
                        class="task-list__item text_white item_${elem.color}">
                            <h4>${elem.name}</h4>
                            <p>${elem.description}</p>
                            <div class="row-container">
                                <p>${elem.dateString}</p>
                                <button id="${elem.id}-D-${item.id}" 
                                class="icon-button icon-button_white icon-button_shifted">
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                </button>
                                <button id="${elem.id}-E-${item.id}" 
                                class="icon-button icon-button_white">
                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                </button>
                            </div>
                        </article>`).join('\n')}
                </div>
    
                <button id="${item.id}-A" class="button button_green task-list__button">
                    <i class="fa fa-plus" aria-hidden="true"></i>
                    Add task
                </button>`;
            lst.insertBefore(column, btn);
        }
    }

    displayAddColumn(formId,  submitId, cancelId) {
        const lst = document.getElementById(this._listId);
        const btn = document.getElementById(this._btnId);
        lst.removeChild(btn);
        let addEditForm = document.createElement('form');
        addEditForm.setAttribute('class', 'add-column-form');
        addEditForm.setAttribute('id', formId);
        addEditForm.innerHTML = `<label class="vertical-field main-field text_blue">New column name
                <input name="name" class="text-field">
            </label>
            <div class="row-container">
                <button class="button button_blue" id="${cancelId}">Cancel</button>
                <button id="${submitId}" type="submit" class="button button_green">Confirm</button>
            </div>`;
        lst.append(addEditForm);
    }

    displayEditColumn(columnId, formId, submitId, cancelId){
        const col = document.getElementById(columnId);
        const title = document.getElementById(`${columnId}-title`);
        col.removeChild(title);
        let addEditForm = document.createElement('form');
        addEditForm.setAttribute('class', 'edit-column-form');
        addEditForm.setAttribute('id', formId);
        addEditForm.innerHTML=`<label class="vertical-field main-field text_blue">New column name
                    <input name="name" class="underline-field">
                </label>
                <div class="row-container">
                    <button class="button button_blue" id="${cancelId}">Cancel</button>
                    <button id="${submitId}" type="submit" class="button button_green">Confirm</button>
                </div>`;
        col.prepend(addEditForm);
    }
}
