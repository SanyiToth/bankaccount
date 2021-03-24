export class AccountOwner {
    constructor(fullName, birthDate, idNumber) {
        this._fullName = fullName;
        this._birthDate = birthDate;
        this._idNumber = idNumber;
    }
    get fullName() {
        return this._fullName;
    }
    get birthDate() {
        return this._birthDate;
    }
    get idNumber() {
        return this._idNumber;
    }
}
