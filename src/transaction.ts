type Action = "withdraw" | "deposit" | "transfer";

export class Transaction {
    private _action: Action
    private _amount: number
    private _date: Date

    constructor(action: Action, amount: number, date: Date) {
        this._action = action;
        this._amount = amount;
        this._date = date;
    }
}