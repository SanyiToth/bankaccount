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

    get transactionHistory() {
        return this.#transactionHistory
    }

    showBalance() {
        return this.#money
    }

    setPin(currentPin) {
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
        return this.#money = this.#money - amount

    }

    deposit(amount) {
        let newTransaction = {
            action: "deposit",
            amount: amount,
            date: new Date()
        }
        this.#transactionHistory.push(newTransaction)
        return this.#money = this.#money + amount
    }

    transferToBackupAccount(amount) {

        
    }


}



