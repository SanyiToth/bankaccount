import {Transaction} from "./transaction.js";

export class BankAccount {
    #name;  //(e.g., "Joe's main account"), which should be determined by some input
    #money;  //which should start out as 0
    #owner; //which contains a AccountOwner object containing the owner's full name, birth date, Id number. Create a class for
    #pin; //which is 4-to-6 digit string
    #transactionHistory = [];
    #backupAccount;
    #countIncorrectPin = Number.parseInt(localStorage.getItem("counter"));


    constructor(money = 0, owner, pin) {
        this.#name = `${owner.fullName}'s account`;
        this.#money = money;
        this.#owner = owner;
        this.#pin = this.#setPin(pin);
    }

    get money() {    //showBalance() method
        return this.#money;
    }

    get backup() {
        return this.#backupAccount;
    }

    #setPin(newPin) {
        while (!this.validatePin(newPin)) {
            window.alert("Wrong format, Try again!");
            newPin = window.prompt("new pin");
        }
        return this.#pin = newPin;
    }

    set backup(account) {
        if (this.validateBackUpAccount(account))
            this.#backupAccount = account;
        else throw new Error("invalid format of account");
    }

    get transactionHistory() {
        return this.#transactionHistory;
    }


    validatePin(newPin) {
        return newPin.length >= 4 && newPin.length <= 6
    }

    validateBackUpAccount(account) {
        return account instanceof BankAccount;
    }

    withdraw(amount) {
        const deficit = amount - this.money;
        let allTheMoney = this.money
        if (this.validateBackUpAccount(this.backup) && this.money < amount && this.backup.money >= deficit) {
            allTheMoney = this.money + this.backup.money;
            this.backup.#money -= deficit;
            this.#transactionHistory.push(new Transaction("transfer", deficit, new Date()));
            this.#money += deficit;
        }
        if (allTheMoney >= amount) {
            this.#transactionHistory.push(new Transaction("withdraw", amount, new Date()));
            this.#money -= amount;
        } else throw new Error("not enough money");
    }

    deposit(amount) {
        this.#transactionHistory.push(new Transaction("deposit", amount, new Date()));
        this.#money += amount;
    }

    changeCounterValue() {
        if (isNaN(this.#countIncorrectPin)) {
            localStorage.setItem("counter", JSON.stringify(0));
            this.#countIncorrectPin = Number.parseInt(localStorage.getItem("counter"));
        }
    }

    isAccountToLocked() {
        return this.#countIncorrectPin >= 3;
    }


    changePin() {
        this.changeCounterValue();
        if (this.#countIncorrectPin >= 0 && this.#countIncorrectPin < 3) {
            while (!this.isAccountToLocked()) {
                if (window.prompt("Give me your currently pin") === this.#pin) {
                    localStorage.setItem("counter", JSON.stringify(0));
                    this.#setPin(window.prompt("new pin"));
                    window.alert("Your pin has been changed!")
                    break;
                } else {
                    localStorage.setItem("counter", JSON.stringify(this.#countIncorrectPin++));
                    let choice = 3 - this.#countIncorrectPin;
                    window.alert(`Incorrect pin. You have ${choice} choice`);
                    if (this.#countIncorrectPin === 3) {
                        localStorage.setItem("counter", JSON.stringify(this.#countIncorrectPin++));
                        window.alert("BankAccount locks down");
                    }
                }
            }
        } else {
            throw new Error("Your BankAccount has been locked")
        }
    }
}



