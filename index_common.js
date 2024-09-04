
// Вы можете рассмотреть добавление некоторых обработок ошибок в функцию calculateCredit для обработки случаев, когда входные значения являются недопустимыми (например, отрицательная сумма кредита, процентная ставка или срок кредита).
// Вы можете рассмотреть добавление форматирования к выходным значениям, например, округления их до двух десятичных знаков с помощью toFixed(2).
// В функции createResultDiv вы создаете новый элемент resultDiv, но не добавляете его к элементу heroSection. Вы должны добавить heroSection.appendChild(resultDiv); в конце функции.
// Вы можете рассмотреть добавление некоторых стилей CSS, чтобы сделать вывод более привлекательным.
//danoCredit в первой функции стоит ли удалять?


(function () {
  //заполнение input 
  document.addEventListener('DOMContentLoaded', function () {
    const inputs = [
      { id: 'summ__credit', value: '300000' },
      { id: 'percentages', value: '30' },
      { id: 'termCredit', value: '60' },
      { id: 'extraPayment', value: '0' }
    ];
    const inputs__com = [
      { id: 'summ__credit__com', value: '10000' },
      { id: 'percentages__com', value: '0' },
      { id: 'termCredit__com', value: '6' },
      { id: 'extraPayment__com', value: '0' }
    ];

    inputs.forEach((input) => {
      const elem = document.getElementById(input.id);
      elem.value = input.value;
    });
    inputs__com.forEach((input) => {
      const elem = document.getElementById(input.id);
      elem.value = input.value;
    });
  });

  // Создаем функцию, которая собирает данные из полей ввода
  function createCalcForm() {
    // Получаем элементы
    const form = document.getElementById('hero__form');
    const summCreditInput = document.getElementById('summ__credit');
    const percentagesInput = document.getElementById('percentages');
    const termCreditInput = document.getElementById('termCredit');
    const extraPaymentInput = document.getElementById('extraPayment');

    const summCreditInput__com = document.getElementById('summ__credit__com');
    const percentagesInput__com = document.getElementById('percentages__com');
    const termCreditInput__com = document.getElementById('termCredit__com');
    const extraPaymentInput__com = document.getElementById('extraPayment__com');

    // Добавляем обработчик события клика на кнопку

    return new Promise(resolve => {
      form.addEventListener('submit', function (e) {
        e.preventDefault(); // предотвратить стандартное действие браузера

        // Собираем данные из полей ввода
        const summCreditValue = parseFloat(summCreditInput.value);
        const percentagesValue = parseFloat(percentagesInput.value);
        const termCreditValue = parseFloat(termCreditInput.value);
        const extraPaymentValue = parseFloat(extraPaymentInput.value);

        const summCreditValue__com = parseFloat(summCreditInput__com.value);
        const percentagesValue__com = parseFloat(percentagesInput__com.value);
        const termCreditValue__com = parseFloat(termCreditInput__com.value);
        const extraPaymentValue__com = parseFloat(extraPaymentInput__com.value);
        // Проверяем данные
        if (summCreditValue <= 0 || percentagesValue < 0 || termCreditValue <= 0 || extraPaymentValue < 0) {
          // Создаем новый div элемент
          const resultDiv = document.createElement('div');
          resultDiv.className = 'result-div';

          let summCreditP2 = document.createElement('p');
          summCreditP2.classList.add(`hero__text`);
          summCreditP2.textContent = `Вы ввели неверное значение`;
          resultDiv.appendChild(summCreditP2);
          alert('Ошибка: сумма кредита, процентная ставка, срок кредита и дополнительный платеж должны быть положительными');
          return;
        }
        if (summCreditValue__com <= 0 || percentagesValue__com < 0 || termCreditValue__com <= 0 || extraPaymentValue__com < 0) {
          // Создаем новый div элемент
          const resultDiv__com = document.createElement('div');
          resultDiv__com.className = 'result-div';

          let summCreditP2__com = document.createElement('p');
          summCreditP2__com.classList.add(`hero__text`);
          summCreditP2__com.textContent = `Вы ввели неверное значение`;
          resultDiv__com.appendChild(summCreditP2__com);
          alert('Ошибка: сумма кредита, процентная ставка, срок кредита и дополнительный платеж должны быть положительными');
          return;
        }

        const formData = {
          danoCreditCredit: parseFloat(summCreditInput.value),
          danoCreditPercentages: parseFloat(percentagesInput.value),
          danoCreditTermCredit: parseFloat(termCreditInput.value),
          danoCreditExtraPayment: parseFloat(extraPaymentInput.value),
          creditTwoCredit: parseFloat(summCreditInput__com.value),
          creditTwoPercentages: parseFloat(percentagesInput__com.value),
          creditTwoTermCredit: parseFloat(termCreditInput__com.value),
          creditTwoExtraPayment: parseFloat(extraPaymentInput__com.value)
        };
        resolve(formData);
      });
    })
  }
  //callback - функция
  let formDataResult;
  createCalcForm().then(formData => {
    formDataResult = formData;
    createResultDiv(formDataResult);
    rasrohVCredit(formDataResult);
    let dolgN = calculateCredit(formDataResult.danoCreditCredit, formDataResult.danoCreditPercentages, formDataResult.danoCreditTermCredit, formDataResult.danoCreditExtraPayment);
    let dolgN__com = calculateCredit(formDataResult.creditTwoCredit, formDataResult.creditTwoPercentages, formDataResult.creditTwoTermCredit, formDataResult.creditTwoExtraPayment);
    return { dolgN, dolgN__com };

  }).then(({ dolgN, dolgN__com }) => {
    const heroSection1 = document.getElementById('hero');
   
    const resultDiv = document.createElement('div');
    resultDiv.className = 'result-div';
    heroSection1.appendChild(resultDiv);
    // Создаем параграфы для вывода данных
    let summCredi = document.createElement('p');
    summCredi.classList.add(`hero__text`);
    summCredi.textContent = `платеж по кредиту равен ${dolgN[0].payment}`;
    resultDiv.appendChild(summCredi);
    // Создаем параграфы для вывода данных common
    let summCredi__com = document.createElement('p');
    summCredi__com.classList.add(`hero__text`);
    summCredi__com.textContent = `платеж по рассрочке равен ${dolgN__com[0].payment}`;
    resultDiv.appendChild(summCredi__com);

  });
  // Создаем функцию, которая создает div элемент для отображения данных
  function createResultDiv(danoCredit) {
    // Удаляем старый div элемент с результатами
    const heroSection1 = document.getElementById('hero');
    const oldResultDivContainer = heroSection1.querySelector('.result-div-container');
    if (oldResultDivContainer) {
      heroSection1.removeChild(oldResultDivContainer);
    }


    // Создаем новый div элемент
    const resultDivContainer = document.createElement('div');
    resultDivContainer.className = 'result-div-container flex';

    const resultDiv = document.createElement('div');
    resultDiv.className = 'result-div';
    resultDivContainer.appendChild(resultDiv);

    const resultDiv__com = document.createElement('div');
    resultDiv__com.className = 'result-div result-div-com';
    resultDivContainer.appendChild(resultDiv__com);


    // Создаем параграфы для вывода данных

    const text = document.createElement('p');
    text.classList.add(`hero__text`, `hero__subtitle`);
    text.textContent = `Ваш кредит:`;

    let summCreditP = document.createElement('p');
    summCreditP.classList.add(`hero__text`);
    summCreditP.textContent = `Сумма кредита: ${danoCredit.danoCreditCredit}`;

    let percentagesP = document.createElement('p');
    percentagesP.classList.add(`hero__text`);
    percentagesP.textContent = `Процентная ставка: ${danoCredit.danoCreditPercentages}%`;

    let termCreditP = document.createElement('p');
    termCreditP.classList.add(`hero__text`);
    termCreditP.textContent = `Срок: ${danoCredit.danoCreditTermCredit} месяцев`;

    let extraPaymentP = document.createElement('p');
    extraPaymentP.classList.add(`hero__text`);
    extraPaymentP.textContent = `Досрочное погашение: ${danoCredit.danoCreditExtraPayment}`;

    //common

    let text__com = document.createElement('p');
    text__com.classList.add(`hero__text`, `hero__subtitle`);
    text__com.textContent = `Ваша рассрочка:`;

    let summCreditP__com = document.createElement('p');
    summCreditP__com.classList.add(`hero__text`);
    summCreditP__com.textContent = `Сумма кредита: ${danoCredit.creditTwoCredit}`;

    let percentagesP__com = document.createElement('p');
    percentagesP__com.classList.add(`hero__text`);
    percentagesP__com.textContent = `Процентная ставка: ${danoCredit.creditTwoPercentages}%`;

    let termCreditP__com = document.createElement('p');
    termCreditP__com.classList.add(`hero__text`);
    termCreditP__com.textContent = `Срок: ${danoCredit.creditTwoTermCredit} месяцев`;

    let extraPaymentP__com = document.createElement('p');
    extraPaymentP__com.classList.add(`hero__text`);
    extraPaymentP__com.textContent = `Досрочное погашение: ${danoCredit.creditTwoExtraPayment}`;


    // Добавляем параграфы к div элементу
    resultDiv.appendChild(text);
    resultDiv.appendChild(summCreditP);
    resultDiv.appendChild(percentagesP);
    resultDiv.appendChild(termCreditP);
    resultDiv.appendChild(extraPaymentP);

    // Добавляем параграфы common к div элементу
    resultDiv__com.appendChild(text__com);
    resultDiv__com.appendChild(summCreditP__com);
    resultDiv__com.appendChild(percentagesP__com);
    resultDiv__com.appendChild(termCreditP__com);
    resultDiv__com.appendChild(extraPaymentP__com);


    // Получаем элемент с id "hero"
    const heroSection = document.getElementById('hero');

    // Добавляем div элемент к элементу с id "hero"
    heroSection.appendChild(resultDivContainer);

  }


  //Функция для подсчета кредита 
  function calculateCredit(credit, percentages, termCredit, extraPayment) {
    // Проверка недопустимых входных значений


    // Рассчитаем месячную процентную ставку
    let monthlyInterestRate = percentages === 0 ? 0.000001 : percentages / 12 / 100;

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


  // Добавляем параграф к div элементу
  resultDiv.appendChild(summCredi);
  if (danoCredit.extraPayment > 0) {
    let summCredi1 = document.createElement('p');
    summCredi1.classList.add(`hero__text`);
    summCredi1.textContent = `при досрочном погашении вы загасите кредит через ${dolgN.length} месяцев`;
    resultDiv.appendChild(summCredi1);
  }

  //common
  // Добавляем параграф к div элементу
  resultDiv__com.appendChild(summCredi__com);
  if (creditTwo.extraPayment > 0) {
    let summCredi1__com = document.createElement('p');
    summCredi1__com.classList.add(`hero__text`);
    summCredi1__com.textContent = `при досрочном погашении вы загасите рассрочку через ${dolgN__com.length} месяцев`;
    resultDiv__com.appendChild(summCredi1__com);
  };

  console.log('-----------------------------------Если мы деньги с рассрочки кидаем в кредит то----------------------------------');

  function rasrohVCredit() {

    let rasVCre = calculateCredit(formDataResult.danoCreditCredit, formDataResult.danoCreditPercentages, formDataResult.danoCreditTermCredit, formDataResult.creditTwoCredit);
    for (let i = 0; i <= rasVCre.length - 1; i++) {
      if (i in rasVCre) {
        console.log(`${rasVCre[i].month} | ${rasVCre[i].payment}`);
      }
    };
    return rasVCre;

  };

  let rasVCre = rasrohVCredit();


  console.log(`вы гасите кредит за ${Number(rasVCre.length)} месяцев`);
  console.log(`с учетом того что каждый месяц мы будем брать рассрочку на ${creditTwo.credit} и вкидывать ее в кредит`);

  //   console.log('-----------------------------------Долговая нагрузка----------------------------------');


  //   console.log(`Наша долговая нагрузка меняется ежемесячно на сумму ежемесячной рассрочки ${dolgNRass[0].payment}`);

  //   function dolgNRassFun() {
  //     let dolgNResults = [];
  //     let accumulatedExtraPayment = 0; // переменная для накопления extraPayment


  //     for (let i = 0; i < Math.max(dolgNRass.length, rasVCre.length); i++) {

  //       let dolgNRassPayment = i < dolgNRass.length ? Number(dolgNRass[i].payment) : 0;
  //       let rasVCrePayment = i < rasVCre.length ? Number(rasVCre[i].payment) : 0;
  //       let extraPayment = dolgNRass[0].payment; // добавляем ежемесячную рассрочку
  //       accumulatedExtraPayment += extraPayment; // накапливаем extraPayment
  //       let dolgNResult = dolgNRassPayment + rasVCrePayment + accumulatedExtraPayment;
  //       if (i > creditTwo.termCredit) {
  //         accumulatedExtraPayment -= extraPayment;
  //       }

  //       if (i === 0) {
  //         dolgNResult = rasVCrePayment + extraPayment;
  //       } else {
  //         dolgNResult = dolgNRassPayment + rasVCrePayment + accumulatedExtraPayment - extraPayment;
  //       }
  //       let month = i + 1;
  //       dolgNResults.push({
  //         dolgNResult: dolgNResult.toFixed(2),
  //         month: month,
  //       });
  //     };

  //     return dolgNResults;
  //   };

  //   let dolgNResults = dolgNRassFun();
  //   console.log(`платежи: `)
  //   dolgNResults.forEach(result => console.log(`Месяц ${result.month}: ${result.dolgNResult}`));
  //   console.log(`долговая нагрузка будет ${dolgNResults.length} месяца`);
  //   console.log(`конечный платеж будет равен ${dolgNResults[dolgNResults.length - 1].dolgNResult} этот платеж будет сроком на ${creditTwo.termCredit} месяцев который 
  // будет ежемесячно уменьшаться на ${dolgNRass[0].payment}рублей. Наша максимальная долговая нагрузка будет равна ${Math.max(...dolgNResults.map(result => Number(result.dolgNResult)))}`);






})();


