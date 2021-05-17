class Column {
    constructor(id, name, tsk = []) {
        this._id = id;
        this.name = name;
        this._tasks = [...tsk];
        this._counter = tsk.length;
    }

    get id() {
        return this._id;
    }

    get length() {
        return this._tasks.length;
    }

    get(id) {
        return this._tasks.find((element) => element.id === id);
    }

    get_all() {
        return this._tasks;
    }

    add(tsk) {
        const { name, description, date, color } = tsk;
        const added = new Task(
            (this._counter++).toString()+'_T',
            name,
            description,
            color,
            date);

        this._tasks.push(added);
    }

    edit(id, tsk) {
        const index = this._tasks.findIndex((element) => element.id === id);
        if (index >= 0) {
            this._tasks[index].name = tsk.name;
            this._tasks[index].description = tsk.description;
            this._tasks[index].color = tsk.color;
            this._tasks[index].date = tsk.date ?? null;
        }
    }

    remove(id) {
        const index = this._tasks.findIndex((element) => element.id === id);
        if (index >= 0) {
            this._tasks.splice(index, 1);
        }
    }

    addAll(tsk) {
        this._tasks = [...this._tasks, ...tsk];
        this._counter += tsk.length;
    }

    get JSONObject() {
        return {
            id: this._id,
            name: this.name,
            tasks: this._tasks.map((tsk) => tsk.JSONObject)
        }
    }

    toJSON() {
        return JSON.stringify(this.JSONObject);
    }
}
