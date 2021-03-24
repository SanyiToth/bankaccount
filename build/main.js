import { BankAccount } from "./bankaccount.js";
import { AccountOwner } from "./accountowner.js";
//1,2
let accountOwner = new AccountOwner("Tóth Sándor", new Date(1985, 1, 16), 1);
console.log(accountOwner);
let account = new BankAccount(5000, accountOwner, "1234");
//3
console.log("account.money", account.money);
account.deposit(5000);
console.log("account.money after deposit", account.money);
//4,5
account.withdraw(2000);
console.log("account.money after withdraw", account.money);
//6
console.log("account.transactionHistory", account.transactionHistory);
//Bonus
let backupAccount = new BankAccount(5000, accountOwner, "4567");
account.backup = backupAccount;
console.log("money main", account.money);
console.log("money backup", account.backup.money);
console.log("money total", account.backup.money + account.money);
account.withdraw(12900);
console.log("money main after withdraw", account.money);
console.log("money backup after withdraw ", account.backup.money);
account.withdraw(100);
console.log("money backup after second withdraw ", account.backup.money);
//Bonus2
account.changePin();
