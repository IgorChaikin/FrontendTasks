class BoardList {
    constructor(username, user_id, brd = []) {
        this.username = username;
        this._user_id = user_id;
        this._boards = [...brd];
        this._counter = brd.length;
    }

    get user_id() {
        return this._user_id;
    }

    get length() {
        return this._boards.length;
    }

    get(id) {
        return this._boards.find((element) => element.id === id);
    }

    get_all(name='') {
        return this._boards.filter((brd) => brd.name.indexOf(name) !== -1);
    }

    add(name, color) {
        const added = new Board(
            (this._counter++).toString()+'_B',
            name,
            color);

        this._boards.push(added);
    }

    edit(id, name, color) {
        const index = this._boards.findIndex((element) => element.id === id);
        if (index >= 0) {
            this._boards[index].name = name ?? this._boards[index].name;
            this._boards[index].color = color ?? this._boards[index].color;
        }
    }

    remove(id) {
        const index = this._boards.findIndex((element) => element.id === id);
        if (index >= 0) {
            this._boards.splice(index, 1);
        }
    }

    addAll(brd) {
        this._boards = [...this._boards, ...brd];
        this._counter += brd.length;
    }


    get JSONObject() {
        return {
            username: this.username,
            user_id: this._user_id,
            boards: this._boards.map((brd) => brd.JSONObject)
        }
    }

    toJSON() {
        return JSON.stringify(this.JSONObject);
    }
}
