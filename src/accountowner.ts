export class AccountOwner {
    _fullName: string;
    _birthDate: Date;
    _idNumber: number;

    constructor(fullName: string, birthDate: Date, idNumber: number) {
        this._fullName = fullName;
        this._birthDate = birthDate;
        this._idNumber = idNumber;
    }

    get fullName(): string {
        return this._fullName;
    }

    get birthDate(): Date {
        return this._birthDate;
    }

    get idNumber(): number {
        return this._idNumber;

    }


}
