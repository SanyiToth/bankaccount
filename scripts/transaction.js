export class Transaction {
    #action
    #amount
    #date

    constructor(action, amount, date) {
        this.#action = action;
        this.#amount = amount;
        this.#date = date;
    }


}