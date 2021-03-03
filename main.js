import {BankAccount} from "./bankaccount.js";
import {AccountOwner} from "./accountowner.js";

//1,2
let accountOwner = new AccountOwner("Tóth Sándor", new Date(1985, 1, 16), 1);
console.log(accountOwner);
let account = new BankAccount(5000, accountOwner, "1234");


//3
console.log(account.money);
account.deposit(5000);
console.log(account.money);
//4,5
account.withdraw(2000);
console.log(account.money);

//6
console.log(account.transactionHistory)

//Bonus
/*let backupAccount = new BankAccount(5000, accountOwner, "4567");
account.backup = backupAccount;
console.log(account.backup);
account.withdraw(9000);
console.log(account.money);
account.transfer();
console.log(account.money);
console.log(account.backup.money);
console.log(account.transactionHistory);*/

//Bonus2
account.changePin()
account.changePin()
console.log(account)

