class User {
    constructor(userID, name, surname, email, phoneNumber, type) {
        this.userID = userID;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.type = type;
    }
}

module.exports = User