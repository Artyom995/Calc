//Кредит,  и его месячные платяжи с досрочным погашением
let danoCredit = {
  credit: 300000,
  percentages: 30,
  termCredit: 60,
  extraPayment: 0
}
console.log('-----------------------------------Кредит----------------------------------');

function calculateCredit(credit, percentages, termCredit, extraPayment) {


  // Рассчитаем месячную процентную ставку
  let monthlyInterestRate = percentages / 12 / 100;

  // Функция для расчета ежемесячного платежа
  function calculateMonthlyPayment(principal, rate, term) {
    return (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
  }

  // Инициализация переменных для отслеживания
  let remainingBalance = credit;
  let totalInterestPaid = 0;
  let monthsPassed = 0;

  let monthlyPaymentArray = [];

  while (remainingBalance > 0 && monthsPassed < termCredit) {
    monthsPassed++;

    // Рассчитываем текущий ежемесячный платеж
    let monthlyPayment = calculateMonthlyPayment(remainingBalance, monthlyInterestRate, termCredit - monthsPassed + 1);

    // Рассчитываем проценты и основной долг в этом платеже
    let interestPayment = remainingBalance * monthlyInterestRate;
    let principalPayment = monthlyPayment - interestPayment;

    // Применяем дополнительный платеж
    let actualExtraPayment = 0;
    if (extraPayment > 0) {
      actualExtraPayment = Math.min(extraPayment, remainingBalance - principalPayment);
      if (actualExtraPayment < 0) {
        actualExtraPayment = 0;
      }
      principalPayment += actualExtraPayment;
    }

    // Обновляем остаток и общую сумму уплаченных процентов
    remainingBalance -= principalPayment;
    totalInterestPaid += interestPayment;

    // Добавляем ежемесячный платеж в массив
    monthlyPaymentArray.push({
      month: monthsPassed,
      payment: Math.round(monthlyPayment * 100) / 100,
      interest: Math.round(interestPayment * 100) / 100,
      principal: Math.round(principalPayment * 100) / 100,
      extraPayment: Math.round(actualExtraPayment * 100) / 100,
      balance: Math.round(remainingBalance * 100) / 100
    });

  }

  return monthlyPaymentArray;
}

// Вызываем функцию с параметрами
let dolgN = calculateCredit(danoCredit.credit, danoCredit.percentages, danoCredit.termCredit, danoCredit.extraPayment);
console.log('платеж по кредиту равен ' + dolgN[0].payment + ' срок: ' + danoCredit.termCredit);
console.log('Вы загасите кредит через ' + dolgN.length + " месяца")


console.log('-----------------------------------Рассрочка----------------------------------');
let creditTwo = {
  amount: 5000,
  termTwo: 6,
  percentages: 0,
  extraPayment: 0,
};

function calculateInstallment(credit, percentages, termCredit, extraPayment) {
  if (percentages === 0 && termCredit === 1) {
    return [{ month: 1, paymesst: credit, interest: 0, principal: credit, extraPayment: 0, balance: 0 }];

  }

  // Рассчитаем месячную процентную ставку
  let monthlyInterestRate = percentages === 0 ? 0.000001 : percentages / 12 / 100;

  // Функция для расчета ежемесячного платежа
  function calculateMonthlyPaymentTwo(principal, rate, term) {
    return (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
  }

  // Инициализация переменных для отслеживания
  let remainingBalance = credit;
  let totalInterestPaid = 0;
  let monthsPassed = 0;

  let monthlyPaymentArray = [];

  while (remainingBalance > 0 && monthsPassed < termCredit) {
    monthsPassed++;

    // Рассчитываем текущий ежемесячный платеж
    let monthlyPayment = calculateMonthlyPaymentTwo(remainingBalance, monthlyInterestRate, termCredit - monthsPassed + 1);

    // Рассчитываем проценты и основной долг в этом платеже
    let interestPayment = remainingBalance * monthlyInterestRate;
    let principalPayment = monthlyPayment - interestPayment;

    // Применяем дополнительный платеж
    let actualExtraPayment = 0;
    if (extraPayment > 0) {
      actualExtraPayment = Math.min(extraPayment, remainingBalance - principalPayment);
      if (actualExtraPayment < 0) {
        actualExtraPayment = 0;
      }
      principalPayment += actualExtraPayment;
    };

    // Обновляем остаток и общую сумму уплаченных процентов
    remainingBalance -= principalPayment;
    totalInterestPaid += interestPayment;

    // Добавляем ежемесячный платеж в массив
    monthlyPaymentArray.push({
      month: monthsPassed,
      payment: Math.round(monthlyPayment * 100) / 100,
      interest: Math.round(interestPayment * 100) / 100,
      principal: Math.round(principalPayment * 100) / 100,
      extraPayment: Math.round(actualExtraPayment * 100) / 100,
      balance: Math.round(remainingBalance * 100) / 100
    });

  }
  return monthlyPaymentArray;
}

// Вызываем функцию с параметрами
let dolgNRass = calculateInstallment(creditTwo.amount, creditTwo.percentages, creditTwo.termTwo, creditTwo.extraPayment);

console.log('платеж по рассрочке равен ' + dolgNRass[0].payment + ' срок: ' + creditTwo.termTwo);
console.log('Вы загасите рассрочку через ' + dolgNRass.length + " месяц");



console.log('-----------------------------------Если мы деньги с рассрочки кидаем в кредит то----------------------------------');

console.log('Рассрочка идет в кредит как досрочное погашение и платежка по кредиту становиться равной: ');
console.log(`месяц | платеж`);
function rasrohVCredit(money) {
  money = danoCredit.extraPayment;

  let rasVCre = calculateCredit(danoCredit.credit, danoCredit.percentages, danoCredit.termCredit, creditTwo.amount);
  for (let i = 0; i <= rasVCre.length - 1; i++) {
    if (i in rasVCre) {
      console.log(`   ${rasVCre[i].month} | ${rasVCre[i].payment}`);
    }
  };
  return rasVCre;
};

let rasVCre = rasrohVCredit();
console.log(`вы гасите кредит за ${Number(rasVCre.length)} месяцев`);
console.log(`с учетом того что каждый месяц мы будем брать рассрочку на ${creditTwo.amount} и вкидывать ее в кредит`);


console.log('-----------------------------------Долговая нагрузка----------------------------------');


console.log(`Наша долговая нагрузка меняется ежемесячно на сумму ежемесячной рассрочки ${dolgNRass[0].payment}`);

function dolgNRassFun() {
  let dolgNResults = [];
  let accumulatedExtraPayment = 0; // переменная для накопления extraPayment


  for (let i = 0; i < Math.max(dolgNRass.length, rasVCre.length); i++) {

    let dolgNRassPayment = i < dolgNRass.length ? Number(dolgNRass[i].payment) : 0;
    let rasVCrePayment = i < rasVCre.length ? Number(rasVCre[i].payment) : 0;
    let extraPayment = dolgNRass[0].payment; // добавляем ежемесячную рассрочку
    accumulatedExtraPayment += extraPayment; // накапливаем extraPayment
    let dolgNResult = dolgNRassPayment + rasVCrePayment + accumulatedExtraPayment;
    if (i > creditTwo.termTwo) {
      accumulatedExtraPayment -= extraPayment;
    }

    if (i === 0) {
      dolgNResult = rasVCrePayment + extraPayment;
    } else {
      dolgNResult = dolgNRassPayment + rasVCrePayment + accumulatedExtraPayment - extraPayment;
    }
    let month = i + 1;
    dolgNResults.push({
      dolgNResult: dolgNResult.toFixed(2),
      month: month,
    });
  };

  return dolgNResults;
};

let dolgNResults = dolgNRassFun();
console.log(`платежи: `)
dolgNResults.forEach(result => console.log(`Месяц ${result.month}: ${result.dolgNResult}`));
console.log(`долговая нагрузка будет ${dolgNResults.length} месяца`);
console.log(`конечный платеж будет равен ${dolgNResults[dolgNResults.length - 1].dolgNResult} этот платеж будет сроком на ${creditTwo.termTwo} месяцев который 
будет ежемесячно уменьшаться на ${dolgNRass[0].payment}рублей. Наша максимальная долговая нагрузка будет равна ${Math.max(...dolgNResults.map(result => Number(result.dolgNResult)))}`);

console.log('-----------------------------------Что мы имеем?----------------------------------');

console.log(`Ежемесячная разница долговой нагрузки равна:`)
function nichtyaki() {
  let platejRaznitsa = [];

  let preobraz = dolgNResults.map(obj => obj.dolgNResult)
  for (i = 0; i < preobraz.length - 1; i++) {
    let platej = Math.round(Number(preobraz[i])) - Math.round(Number(preobraz[i + 1]));
    platejRaznitsa.push({
      platej: platej
    })
  };
  let nichtyakisumm = [];
  let resultNichtyaki = dolgNResults.length * creditTwo.amount;
  nichtyakisumm.push(resultNichtyaki);

  return {
    platejRaznitsa: platejRaznitsa,
    nichtyakisumm: nichtyakisumm,
  }
}

let nichtyakiResult = nichtyaki();

console.log(nichtyakiResult);
console.log(`Итог: При взятии рассрочки ${creditTwo.amount} под ${creditTwo.percentages} годовых сроком на ${creditTwo.termTwo} месяцев и вкладывая ее в кредит ${danoCredit.credit} который взят под ${danoCredit.percentages}
  Мы имеем:
  Ежемесячно уменьшающийся платеж по кредиту примерно на ${nichtyakiResult.platejRaznitsa[nichtyakiResult.platejRaznitsa.length - 1].platej}. 
  Растущую долговую нагрузку на срок рассрочки, максимальную долговую нагрузку равной ${Math.max(...dolgNResults.map(result => Number(result.dolgNResult)))}
  Погашение кредита через ${Number(rasVCre.length)} месяцев.
  После того как кредит загаситься полностью останеться платеж который равен ${dolgNResults[dolgNResults.length - 1].dolgNResult} рублей сроком на ${creditTwo.termTwo} месяцев который будет ежемесячно уменьшаться на ${dolgNRass[0].payment} рублей.
  А так же за ${dolgNResults.length} месяцев - вещей равных сумме ${nichtyakiResult.nichtyakisumm} рублей`)

