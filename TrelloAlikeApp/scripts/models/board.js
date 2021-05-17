class Board {
    constructor(id, name, color, col = []) {
        this._id = id;
        this.name = name;
        this.color = color;
        this._columns = [...col];
        this._counter = col.length;
    }

    get id() {
        return this._id;
    }

    get length() {
        return this._columns.length;
    }

    get(id) {
        return this._columns.find((element) => element.id === id);
    }

    get_all() {
        return this._columns;
    }

    add(name) {
        const added = new Column(
            (this._counter++).toString()+'_C',
            name);

        this._columns.push(added);
    }

    edit(id, name) {
        const index = this._columns.findIndex((element) => element.id === id);
        if (index >= 0) {
            this._columns[index].name = name ?? this._columns[index].name;
        }
    }

    move(tsk_id, source_col_id, target_col_id) {
        const source_col_idx = this._columns.findIndex((element) => element.id === source_col_id);
        const target_col_idx = this._columns.findIndex((element) => element.id === target_col_id);
        if (source_col_idx >= 0 && target_col_idx >= 0) {
            const { name, description, color, date} = this._columns[source_col_idx];
            this._columns[target_col_idx].add({
                    name: name,
                    description: description,
                    color: color,
                    date: new Date(date)
            });
            this._columns[source_col_idx].remove(tsk_id);
        }
    }

    remove(id) {
        const index = this._columns.findIndex((element) => element.id === id);
        if (index >= 0) {
            this._columns.splice(index, 1);
        }
    }

    addAll(col) {
        this._columns = [...this._columns, ...col];
        this._counter += col.length;
    }

    get JSONObject() {
        return {
            id: this._id,
            name: this.name,
            color: this.color,
            columns: this._columns.map((col) => col.JSONObject)
        }
    }

    toJSON() {
        return JSON.stringify(this.JSONObject);
    }
}
