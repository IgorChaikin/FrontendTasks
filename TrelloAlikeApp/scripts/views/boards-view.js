class BoardsView {
    constructor(headerId, mainId, listId, formId, btnId) {
        this._headerId = headerId;
        this._mainId = mainId;
        this._listId = listId;
        this._formId = formId;
        this._btnId = btnId;
    }

    displayHeader(username, toBoardsId, logoutId) {
        const header = document.getElementById(this._headerId);
        header.innerHTML = `<figure class="row-container">
                    <img src="img/logo.png" alt=""/>
                    <figcaption><h2 class="text_white">TrelloAlikeApp</h2></figcaption>
                </figure>
            
                <figure class="row-container">
                    <img src="img/user.png" alt=""/>
                    <figcaption><p class="text_white">${username}</p></figcaption>
                </figure>
                <nav>
                    <button class="button button_blue" id = "${toBoardsId}">My boards</button>
                    <button class="button button_blue" id = "${logoutId}">Log out</button>
                </nav>`;
    }

    displayMain() {
        const main = document.getElementById(this._mainId);
        main.innerHTML = `<h2 class="text_blue">Boards</h2>
                <form class="board-form" id="${this._formId}">
                    <label class="vertical-field main-field text_blue">Search
                        <input name = "name" class="text-field">
                    </label>
                    <button class="button button_green">
                        <i class="fa fa-search" aria-hidden="true"></i>
                    </button>
                </form>
                <div id="${this._listId}" class="board-list"></div>
                <button id="${this._btnId}" class="button button_green">
                    <i class="fa fa-plus" aria-hidden="true"></i>
                    Add new
                </button>`;
    }

    displayBoards(brd){
        const lst = document.getElementById(this._listId);
        lst.innerHTML = brd.map((item) =>
            `<section id="${item.id}" class="board-list__item item_${item.color}" draggable="true">
                <h3 class="text_white">${item.name}</h3>
                <button id="${item.id}-D" class="icon-button icon-button_white icon-button_shifted">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
                <button id="${item.id}-E" class="icon-button icon-button_white">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </button>
            </section>`
        ).join('\n');
    }

    displayAddEdit(formId, cancelId) {
        const main = document.getElementById(this._mainId);
        const search = document.getElementById(this._formId);
        const lst = document.getElementById(this._listId);
        const btn = document.getElementById(this._btnId);

        main.removeChild(search);
        main.removeChild(btn);
        let addEditForm = document.createElement('form');
        addEditForm.setAttribute('class', 'board-form');
        addEditForm.setAttribute('id', formId);
        addEditForm.innerHTML = `<label class="vertical-field main-field text_blue">Color
            <select name="color" class="text-field">
                <option class="item_red text_white" value="red">Red</option>
                <option class="item_orange text_white" value="orange">Orange</option>
                <option class="item_yellow text_white" value="yellow">Yellow</option>
                <option class="item_green text_white" value="green">Green</option>
                <option class="item_cyan text_white" value="cyan">Cyan</option>
                <option class="item_blue text_white" value="blue">Blue</option>
                <option class="item_violet text_white" value="violet">Violet</option>
            </select>
        </label>
        <label class="vertical-field main-field text_blue">Name
            <input name="name" class="text-field">
        </label>
        <button id = "${cancelId}" class="button button_blue">
            Cancel
        </button>
        <button type="submit" class="button button_green">
            Confirm
        </button>`;
        main.insertBefore(addEditForm, lst);
    }
}











