class Task {
    constructor(id, name, description, color, date = null) {
        this._id = id;
        this.name = name;
        this.description = description;
        this.color = color;
        this.date = date;
    }

    get id() {
        return this._id;
    }

    get dateString() {
        return this.date !== null ?
            `${this.date.getDate().toString().padStart(2, '0')}.${
            (this.date.getMonth() + 1).toString().padStart(2, '0')}.${
            this.date.getFullYear()}`:
            '';
    }

    get dateFormatString() {
        return this.date !== null ?
            `${this.date.getFullYear()}-${
            (this.date.getMonth() + 1).toString().padStart(2, '0')}-${
            this.date.getDate().toString().padStart(2, '0')}T00:00:00`:
            null;
    }

    get JSONObject() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            color: this.color,
            date: this.dateFormatString
        }
    }

    toJSON() {
        return JSON.stringify(this.JSONObject);
    }
}
