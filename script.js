import {BankAccount} from "./bankaccount.js"
import {AccountOwner} from "./accountowner.js"

let accountOwner = new AccountOwner("Tóth Sándor", new Date(1985, 1, 16), 1)

let account = new BankAccount(5000, accountOwner, "1234");
let backupAccount = new BankAccount(5000, accountOwner, "1234");
console.log(`backup ${account.money}`);
account.backup = backupAccount;


/*console.log(account);
console.log(account.owner);
console.log(account.showBalance());
console.log(account.transactionHistory);
account.deposit(1000);
console.log(account.transactionHistory);
account.withdraw(500);
console.log(account.transactionHistory);
account.pin = "1234";*/
