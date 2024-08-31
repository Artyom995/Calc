console.log('-----------------------------------Рассрочка----------------------------------');
let creditTwo = {
  amount: 5000,
  termTwo: 10,
  interestRate: 0.249,
  money: 5000,
};

function calculateInstallment(credit) {
  let remainingBalance = credit.amount;
  let totalInterestPaid = 0;
  let monthlyPayments = [];

  let monthlyInterestRate = credit.interestRate / 12;
  let monthlyPayment = (remainingBalance * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, credit.termTwo)) / (Math.pow(1 + monthlyInterestRate, credit.termTwo) - 1);
  console.log(`Общая сумма платежа ` + monthlyPayment.toFixed(2));
  for (let month = 1; month <= credit.termTwo; month++) {
    let interest = remainingBalance * monthlyInterestRate;
    console.log(`Месяц ${month}: платеж ${monthlyPayment.toFixed(2)}, проценты ${interest.toFixed(2)}, остаток ${Math.round(remainingBalance - monthlyPayment - interest)}`);
    remainingBalance -= monthlyPayment - interest;
    totalInterestPaid += interest;
    monthlyPayments.push({
      month: month,
      payment: monthlyPayment.toFixed(2),
      interest: interest.toFixed(2),
      balance: remainingBalance.toFixed(2),
    });
  }

  console.log(`Общая сумма уплаченных процентов: ${totalInterestPaid.toFixed(2)}`);
  return monthlyPayments;
}

let dolgNRass = calculateInstallment(creditTwo);


console.log('-----------------------------------Если мы деньги с рассрочки кидаем в кредит то----------------------------------')

function rasrohVCredit(money) {
  money = danoCredit.extraPayment;
  let rasVCre = calculateCredit(danoCredit.credit, danoCredit.percentages, danoCredit.termCredit, danoCredit.extraPayment);
  for (let i = 0; i <= rasVCre.length - 1; i++) {
    if (i in rasVCre) {
      console.log(Number(rasVCre[i].payment));
    }
  };
  return rasVCre;
};

let rasVCre = rasrohVCredit(creditTwo.money);
