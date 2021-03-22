import {Transaction} from "./transaction";
import {AccountOwner} from "./accountowner";

export class BankAccount {
    private _name: string;  //(e.g., "Joe's main account"), which should be determined by some input
    private _money: number;  //which should start out as 0
    private _owner: AccountOwner; //which contains a AccountOwner object containing the owner's full name, birth date, Id number. Create a class for
    private _pin: string | undefined; //which is 4-to-6 digit string
    private _transactionHistory: Transaction[] = [];
    private _backupAccount?: BankAccount;
    private _countIncorrectPin: number = Number.parseInt(<string>localStorage.getItem("counter"));


    constructor(money = 0, owner: AccountOwner, pin: string) {
        this._name = `${owner.fullName}'s account`;
        this._money = money;
        this._owner = owner;
        this.setPin(pin);
    }

    get money(): number {    //showBalance() method
        return this._money;
    }

    get backup(): BankAccount {
        return <BankAccount>this._backupAccount
    }

    private setPin(pin: string): void {
        while (!this.validatePin(pin)) {
            window.alert("Wrong format, Try again!");
            pin = <string>window.prompt("new pin");
        }
        this._pin = pin;
    }

    set backup(account) {
        BankAccount.validateBackUpAccount(account) ? this._backupAccount = account : new Error("invalid format of account");
    }

    get transactionHistory(): Transaction[] {
        return this._transactionHistory;
    }


    validatePin(pin: string): boolean {
        return pin.length >= 4 && pin.length <= 6
    }

    private static validateBackUpAccount(account: BankAccount | undefined): boolean {
        return account instanceof BankAccount;
    }

    withdraw(amount: number): void {
        const deficit = amount - this.money;
        let allTheMoney = this.money
        if (BankAccount.validateBackUpAccount(this.backup) && this.money < amount && this.backup.money >= deficit) {
            allTheMoney = this.money + this.backup.money;
            this.backup._money -= deficit;
            this._transactionHistory.push(new Transaction("transfer", deficit, new Date()));
            this._money += deficit;
        }
        if (allTheMoney >= amount) {
            this._transactionHistory.push(new Transaction("withdraw", amount, new Date()));
            this._money -= amount;
        } else throw new Error("not enough money");
    }

    deposit(amount: number): void {
        this._transactionHistory.push(new Transaction("deposit", amount, new Date()));
        this._money += amount;
    }

    changeCounterValue(): void {
        if (isNaN(this._countIncorrectPin)) {
            localStorage.setItem("counter", JSON.stringify(0));
            this._countIncorrectPin = Number.parseInt(<string>localStorage.getItem("counter"));
        }
    }

    isAccountToLocked() {
        return this._countIncorrectPin >= 3;
    }


    changePin(): void {
        this.changeCounterValue();
        if (this._countIncorrectPin >= 0 && this._countIncorrectPin < 3) {
            while (!this.isAccountToLocked()) {
                if (window.prompt("Give me your currently pin") === this._pin) {
                    localStorage.setItem("counter", JSON.stringify(0));
                    this.setPin(<string>window.prompt("new pin"));
                    window.alert("Your pin has been changed!")
                    break;
                } else {
                    localStorage.setItem("counter", JSON.stringify(this._countIncorrectPin++));
                    let choice = 3 - this._countIncorrectPin;
                    window.alert(`Incorrect pin. You have ${choice} choice`);
                    if (this._countIncorrectPin === 3) {
                        localStorage.setItem("counter", JSON.stringify(this._countIncorrectPin++));
                        window.alert("BankAccount locks down");
                    }
                }
            }
        } else {
            throw new Error("Your BankAccount has been locked")
        }
    }
}



