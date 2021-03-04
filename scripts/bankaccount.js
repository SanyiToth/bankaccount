import {Transaction} from "./transaction.js";

export class BankAccount {
    #name;  //(e.g., "Joe's main account"), which should be determined by some input
    #money;  //which should start out as 0
    #owner; //which contains a AccountOwner object containing the owner's full name, birth date, Id number. Create a class for
    #pin; //which is 4-to-6 digit string
    #transactionHistory = [];
    backupAccount;  //priváttá tenni
    #countIncorrectPin = 0;

    constructor(money = 0, owner, pin) {
        this.name = `${owner.fullName}'s account`;
        this.#money = money;
        this.owner = owner;
        this.pin = pin;
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }

    get owner() {
        return this.#owner;
    }

    set owner(newOwner) {
        this.#owner = newOwner;
    }

    get money() {    //showBalance() method
        return this.#money;
    }

    set money(amount) {
        this.#money = amount;
    }

    get backup() {
        return this.backupAccount;
    }

    set backup(account) {  //instanceof validációt beépíteni, ha nem account peldany akkor hibát dobjon
        this.backupAccount = account;
    }

    get transactionHistory() {
        return this.#transactionHistory;
    }

    set pin(newPin) {
        if (this.validatePin(newPin)) {
            this.#pin = newPin;
        } else throw new Error("Wrong format")
    }


    validatePin(newPin) {
        return newPin.length >= 4 && newPin.length <= 6
    }

    validateBackUpAccount(account){
        return account instanceof BankAccount;
    }


    withdraw(amount) {
        if (this.money >= amount) {
            this.#transactionHistory.push(new Transaction("withdraw", amount, new Date()));
            this.#money -= amount;
        }

    }

    deposit(amount) {
        this.#transactionHistory.push(new Transaction("deposit", amount, new Date()));
        this.#money += amount;
    }

    transfer() {
        let different = 0 - this.money
        if (this.money < 0 && this.backup.money >= different) {
            this.#transactionHistory.push(new Transaction("transfer", Math.abs(different), new Date()));
            this.backup.money = this.backup.money - Math.abs(different)
            this.#money = 0;
        }
    }

    isAccountToLocked() {
        return this.#countIncorrectPin >= 3;
    }

    changePin() {  //elmenteni localstorageba a countincorrect pin számláló állását és chekkolni minden futtatáskor
        while (!this.isAccountToLocked()) {
            if (window.prompt("Give me your currently pin") === this.#pin) {
                this.#countIncorrectPin = 0;
                let newPin = window.prompt("new pin")
                while (!this.validatePin(newPin)) {
                    window.alert("Wrong format, Try again!")
                    newPin = window.prompt("new pin")
                }
                window.alert("Your pin has been changed!")
                break;
            } else {
                this.#countIncorrectPin++;
                let choice = 3 - this.#countIncorrectPin;
                window.alert(`Incorrect pin. You have ${choice} choice`);
                if (choice === 0) {
                    window.alert("BankAccount locks down");
                    break;
                }
            }

        }
    }

}



