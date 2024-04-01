class User {
    constructor(name, email, password, organizer) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.organizer = organizer;
    }

    fromObject(obj) {
        this.name = obj.name;
        this.email = obj.email;
        this.password = obj.password;
        this.organizer = obj.organizer;
    }

    toStr() {
        return `Name: ${this.name}, Email: ${this.email}, Organizer: ${this.organizer}`;
    }
}