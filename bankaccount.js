export class BankAccount {
    name  //(e.g., "Joe's main account"), which should be determined by some input
    #money  //which should start out as 0
    #owner //which contains a AccountOwner object containing the owner's full name, birth date, Id number. Create a class for
    #pin //which is 4-to-6 digit string
    #transactionHistory = []
    backupAccount
    #countIncorrectPin = 0

    constructor(money = 0, owner, pin) {
        this.name = `${owner.fullName}'s main account`
        this.#money = money
        this.#owner = owner
        this.#pin = pin
    }

    get owner() {
        return this.#owner
    }

    get money() {
        return this.#money
    }

    set money(amount) {
        this.#money = amount

    }

    get transactionHistory() {
        return this.#transactionHistory
    }

    get backup() {
        return this.backupAccount;
    }

    set backup(account) {
        this.backupAccount = account;

    }

    set pin(currentPin) {
        if (currentPin === this.#pin && !this.isAccountToLocked()) {
            this.#countIncorrectPin = 0;
            let newPin = window.prompt("new pin")
            if (this.validatePin(newPin)) {
                this.#pin = newPin
            }
        } else if (!this.isAccountToLocked()) {
            this.#countIncorrectPin++
            throw TypeError("Incorrect pin")
        } else {
            throw TypeError("BankAccount locks down")
        }
    }


    showBalance() {
        return this.#money
    }


    isAccountToLocked() {
        return this.#countIncorrectPin > 3;
    }


    validatePin(newPin) {
        if (newPin.length >= 4 && newPin.length <= 6) {
            return true
        }
        throw TypeError("Wrong format!")
    }

    withdraw(amount) {
        let newTransaction = {
            action: "withdraw",
            amount: amount,
            date: new Date()
        }
        this.#transactionHistory.push(newTransaction)
        this.#money = this.#money - amount
    }

    deposit(amount) {
        let newTransaction = {
            action: "deposit",
            amount: amount,
            date: new Date()
        }
        this.#transactionHistory.push(newTransaction)
        this.#money = this.#money + amount
    }

    transfer() {
        let different = this.backup.money - this.money
        if (this.money < 0 && this.backup.money >= different) {
            let newTransaction = {
                action: "transfer",
                amount: different,
                date: new Date()
            }
            this.#transactionHistory.push(newTransaction)
            this.backup.#money = this.backup.money - this.money
            this.#money = 0
        }

    }


}



