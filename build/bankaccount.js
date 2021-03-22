import { Transaction } from "./transaction";
export class BankAccount {
    constructor(money = 0, owner, pin) {
        this._transactionHistory = [];
        this._countIncorrectPin = Number.parseInt(localStorage.getItem("counter"));
        this._name = `${owner.fullName}'s account`;
        this._money = money;
        this._owner = owner;
        this.setPin(pin);
    }
    get money() {
        return this._money;
    }
    get backup() {
        return this._backupAccount;
    }
    setPin(pin) {
        while (!this.validatePin(pin)) {
            window.alert("Wrong format, Try again!");
            pin = window.prompt("new pin");
        }
        this._pin = pin;
    }
    set backup(account) {
        BankAccount.validateBackUpAccount(account) ? this._backupAccount = account : new Error("invalid format of account");
    }
    get transactionHistory() {
        return this._transactionHistory;
    }
    validatePin(pin) {
        return pin.length >= 4 && pin.length <= 6;
    }
    static validateBackUpAccount(account) {
        return account instanceof BankAccount;
    }
    withdraw(amount) {
        const deficit = amount - this.money;
        let allTheMoney = this.money;
        if (BankAccount.validateBackUpAccount(this.backup) && this.money < amount && this.backup.money >= deficit) {
            allTheMoney = this.money + this.backup.money;
            this.backup._money -= deficit;
            this._transactionHistory.push(new Transaction("transfer", deficit, new Date()));
            this._money += deficit;
        }
        if (allTheMoney >= amount) {
            this._transactionHistory.push(new Transaction("withdraw", amount, new Date()));
            this._money -= amount;
        }
        else
            throw new Error("not enough money");
    }
    deposit(amount) {
        this._transactionHistory.push(new Transaction("deposit", amount, new Date()));
        this._money += amount;
    }
    changeCounterValue() {
        if (isNaN(this._countIncorrectPin)) {
            localStorage.setItem("counter", JSON.stringify(0));
            this._countIncorrectPin = Number.parseInt(localStorage.getItem("counter"));
        }
    }
    isAccountToLocked() {
        return this._countIncorrectPin >= 3;
    }
    changePin() {
        this.changeCounterValue();
        if (this._countIncorrectPin >= 0 && this._countIncorrectPin < 3) {
            while (!this.isAccountToLocked()) {
                if (window.prompt("Give me your currently pin") === this._pin) {
                    localStorage.setItem("counter", JSON.stringify(0));
                    this.setPin(window.prompt("new pin"));
                    window.alert("Your pin has been changed!");
                    break;
                }
                else {
                    localStorage.setItem("counter", JSON.stringify(this._countIncorrectPin++));
                    let choice = 3 - this._countIncorrectPin;
                    window.alert(`Incorrect pin. You have ${choice} choice`);
                    if (this._countIncorrectPin === 3) {
                        localStorage.setItem("counter", JSON.stringify(this._countIncorrectPin++));
                        window.alert("BankAccount locks down");
                    }
                }
            }
        }
        else {
            throw new Error("Your BankAccount has been locked");
        }
    }
}
