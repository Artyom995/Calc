
// Вы можете рассмотреть добавление некоторых обработок ошибок в функцию calculateCredit для обработки случаев, когда входные значения являются недопустимыми (например, отрицательная сумма кредита, процентная ставка или срок кредита).
// Вы можете рассмотреть добавление форматирования к выходным значениям, например, округления их до двух десятичных знаков с помощью toFixed(2).
// В функции createResultDiv вы создаете новый элемент resultDiv, но не добавляете его к элементу calcSection. Вы должны добавить calcSection.appendChild(resultDiv); в конце функции.
// Вы можете рассмотреть добавление некоторых стилей CSS, чтобы сделать вывод более привлекательным.
//danoCredit в первой функции стоит ли удалять?


(function () {
  //footer click
  document.addEventListener('DOMContentLoaded', function () {

    const items = document.querySelectorAll('.footer__item');
  
    items.forEach((item) => {
      const h3 = item.querySelector('h3');
      const p = item.querySelector('p');
    
      h3.addEventListener('click', () => {
        p.style.display = p.style.display === 'block' ? 'none' : 'block';
      });
    });
  });
  
  // Создаем функцию, которая собирает данные из полей ввода

  //callback - функция
  function createCalcForm() {
    // Получаем элементы
    const form = document.getElementById('calc__form');
    const summCreditInput = document.getElementById('summ__credit');
    const percentagesInput = document.getElementById('percentages');
    const termCreditInput = document.getElementById('termCredit');


    const summCreditInput__com = document.getElementById('summ__credit__com');
    const percentagesInput__com = document.getElementById('percentages__com');
    const termCreditInput__com = document.getElementById('termCredit__com');

    // Добавляем обработчик события клика на кнопку
    

    return new Promise(resolve => {
      form.addEventListener('submit', function (e) {
        e.preventDefault(); // предотвратить стандартное действие браузера
        // Собираем данные из полей ввода
        const calcSection1 = document.getElementById('calc');
        const resultDivs = calcSection1.querySelectorAll('.result__div__pay,.result-div-container, .table');
        resultDivs.forEach(div => div.remove());


        createCalcForm().then(formData => {
          formDataResult = formData;
          createResultDiv(formDataResult);
          let dolgN = calculateCredit(formDataResult.danoCreditCredit, formDataResult.danoCreditPercentages, formDataResult.danoCreditTermCredit, 0);
          let dolgN__com = calculateCredit(formDataResult.creditTwoCredit, formDataResult.creditTwoPercentages, formDataResult.creditTwoTermCredit, 0);

          {
            const calcSection1 = document.getElementById('calc');
            const resultDiv = document.createElement('div');
            resultDiv.className = 'result__div__pay';
            calcSection1.appendChild(resultDiv);

            // Создаем параграфы для вывода данных
            let summCredi = document.createElement('p');
            summCredi.classList.add(`text`, `text__pay`);
            summCredi.textContent = `платеж по кредиту равен ${dolgN[0].payment}`;
            resultDiv.appendChild(summCredi);

            // Создаем параграфы для вывода данных common
            let summCredi__com = document.createElement('p');
            summCredi__com.classList.add(`text`, `text__pay`);
            summCredi__com.textContent = `платеж по рассрочке равен ${dolgN__com[0].payment}`;
            resultDiv.appendChild(summCredi__com);
          }
          let rasVCre = rasrohVCredit(formDataResult);
          let dolgNResults = debtBurden(rasVCre, dolgN__com);
          results(formDataResult, dolgN, dolgN__com, rasVCre, dolgNResults);
        });


        if (summCreditInput.value.includes(' ')) {
          summCreditInput.value = summCreditInput.value.replace(/\s+/g, '');
        }
        const summCreditValue = parseFloat(summCreditInput.value);
        
        if (percentagesInput.value.includes(' ')) {
          percentagesInput.value = percentagesInput.value.replace(/\s+/g, '');
        }
        const percentagesValue = parseFloat(percentagesInput.value);
        
        if (termCreditInput.value.includes(' ')) {
          termCreditInput.value = termCreditInput.value.replace(/\s+/g, '');
        }
        const termCreditValue = parseFloat(termCreditInput.value);
        
        if (summCreditInput__com.value.includes(' ')) {
          summCreditInput__com.value = summCreditInput__com.value.replace(/\s+/g, '');
        }
        const summCreditValue__com = parseFloat(summCreditInput__com.value);
        
        if (percentagesInput__com.value.includes(' ')) {
          percentagesInput__com.value = percentagesInput__com.value.replace(/\s+/g, '');
        }
        const percentagesValue__com = parseFloat(percentagesInput__com.value);
        
        if (termCreditInput__com.value.includes(' ')) {
          termCreditInput__com.value = termCreditInput__com.value.replace(/\s+/g, '');
        }
        const termCreditValue__com = parseFloat(termCreditInput__com.value);

        // Проверяем данные
        if (summCreditValue <= 0 || percentagesValue < 0 || termCreditValue <= 0) {
          // Создаем новый div элемент
          const resultDiv = document.createElement('div');
          resultDiv.className = 'result-div';

          let summCreditP2 = document.createElement('p');
          summCreditP2.classList.add(`text`);
          summCreditP2.textContent = `Вы ввели неверное значение`;
          resultDiv.appendChild(summCreditP2);
          alert('Ошибка: сумма кредита, процентная ставка, срок кредита и дополнительный платеж должны быть положительными');
          return;
        }
        if (summCreditValue__com <= 0 || percentagesValue__com < 0 || termCreditValue__com <= 0) {
          // Создаем новый div элемент
          const resultDiv__com = document.createElement('div');
          resultDiv__com.className = 'result-div';

          let summCreditP2__com = document.createElement('p');
          summCreditP2__com.classList.add(`text`);
          summCreditP2__com.textContent = `Вы ввели неверное значение`;
          resultDiv__com.appendChild(summCreditP2__com);
          alert('Ошибка: сумма кредита, процентная ставка, срок кредита и дополнительный платеж должны быть положительными');
          return;
        }




        
        const formData = {
          danoCreditCredit: parseFloat(summCreditInput.value),
          danoCreditPercentages: parseFloat(percentagesInput.value),
          danoCreditTermCredit: parseFloat(termCreditInput.value),


          creditTwoCredit: parseFloat(summCreditInput__com.value),
          creditTwoPercentages: parseFloat(percentagesInput__com.value),
          creditTwoTermCredit: parseFloat(termCreditInput__com.value),
        };
        resolve(formData);
      });
    })
  }
  createCalcForm().then(formData => {
    formDataResult = formData;
    createResultDiv(formDataResult);
    let dolgN = calculateCredit(formDataResult.danoCreditCredit, formDataResult.danoCreditPercentages, formDataResult.danoCreditTermCredit, 0);
    let dolgN__com = calculateCredit(formDataResult.creditTwoCredit, formDataResult.creditTwoPercentages, formDataResult.creditTwoTermCredit, 0);

    {
      const calcSection1 = document.getElementById('calc');
      const resultDiv = document.createElement('div');
      resultDiv.className = 'result__div__pay';
      calcSection1.appendChild(resultDiv);

      // Создаем параграфы для вывода данных
      let summCredi = document.createElement('p');
      summCredi.classList.add(`text`, `text__pay`);
      summCredi.textContent = `Платеж по кредиту равен ${dolgN[0].payment}`;
      resultDiv.appendChild(summCredi);

      // Создаем параграфы для вывода данных common
      let summCredi__com = document.createElement('p');
      summCredi__com.classList.add(`text`, `text__pay`);
      summCredi__com.textContent = `Платеж по рассрочке равен ${dolgN__com[0].payment}`;
      resultDiv.appendChild(summCredi__com);
    }
    let rasVCre = rasrohVCredit(formDataResult);
    let dolgNResults = debtBurden(rasVCre, dolgN__com);
    results(formDataResult, dolgN, dolgN__com, rasVCre, dolgNResults);
  });



  // Создаем функцию, которая создает div элемент для отображения данных
  function createResultDiv(danoCredit) {

    // Добавляем div элемент к элементу с id "calc"

    const calcSection = document.getElementById('calc');
    // Создаем новый div элемент
    const resultDivContainer = document.createElement('div');
    resultDivContainer.className = 'result-div-container flex';

    const resultDiv = document.createElement('div');
    resultDiv.className = 'result-div';
    resultDivContainer.appendChild(resultDiv);

    const resultDiv__com = document.createElement('div');
    resultDiv__com.className = 'result-div result-div-com';
    resultDivContainer.appendChild(resultDiv__com);
    calcSection.appendChild(resultDivContainer);

    // Создаем параграфы для вывода данных

    const text = document.createElement('p');
    text.classList.add(`text`, `calc__subtitle`);
    text.textContent = `Ваш кредит:`;

    let summCredit = document.createElement('p');
    summCredit.classList.add(`text`, `text__div`);
    summCredit.textContent = `Сумма кредита: ${danoCredit.danoCreditCredit}`;

    let percentages = document.createElement('p');
    percentages.classList.add(`text`, `text__div`);
    percentages.textContent = `Процентная ставка: ${danoCredit.danoCreditPercentages}%`;

    let termCredit = document.createElement('p');
    termCredit.classList.add(`text`, `text__div`);
    termCredit.textContent = `Срок: ${danoCredit.danoCreditTermCredit} месяцев`;


    //common

    let text__com = document.createElement('p');
    text__com.classList.add(`text`, `calc__subtitle`);
    text__com.textContent = `Ваша рассрочка:`;

    let summCredit__com = document.createElement('p');
    summCredit__com.classList.add(`text`, `text__div`);
    summCredit__com.textContent = `Сумма кредита: ${danoCredit.creditTwoCredit}`;

    let percentages__com = document.createElement('p');
    percentages__com.classList.add(`text`, `text__div`);
    percentages__com.textContent = `Процентная ставка: ${danoCredit.creditTwoPercentages}%`;

    let termCredit__com = document.createElement('p');
    termCredit__com.classList.add(`text`, `text__div`);
    termCredit__com.textContent = `Срок: ${danoCredit.creditTwoTermCredit} месяцев`;



    // Добавляем параграфы к div элементу
    resultDiv.appendChild(text);
    resultDiv.appendChild(summCredit);
    resultDiv.appendChild(percentages);
    resultDiv.appendChild(termCredit);


    // Добавляем параграфы common к div элементу
    resultDiv__com.appendChild(text__com);
    resultDiv__com.appendChild(summCredit__com);
    resultDiv__com.appendChild(percentages__com);
    resultDiv__com.appendChild(termCredit__com);





  }

  //Функция для подсчета кредита 
  function calculateCredit(credit, percentages, termCredit, extraPayment) {
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
  //Функция для создания таблицы
  function rasrohVCredit() {
    let rasVCre = calculateCredit(formDataResult.danoCreditCredit, formDataResult.danoCreditPercentages, formDataResult.danoCreditTermCredit, formDataResult.creditTwoCredit);

    const calcSection2 = document.getElementById('calc');

    // Таблица
    const resultDiv1 = document.createElement('div');
    resultDiv1.className = 'result__div__pay';
    calcSection2.appendChild(resultDiv1);

    const textTable =document.createElement('p') 
    textTable.className = 'text__table text';
    textTable.textContent = `Таблица расчета кредита при его погашении суммой рассрочки`
    resultDiv1.appendChild(textTable);

    const table = document.createElement('table');
    table.className = 'table table__v__credit';
    resultDiv1.appendChild(table);

    const tableHead = document.createElement('thead');
    table.appendChild(tableHead);

    const tableHeadRow = document.createElement('tr');
    tableHead.appendChild(tableHeadRow);

    const tableHeadCells = ['Месяц', 'Платеж', 'Процент', 'Основной долг', 'Дополнительный платеж', 'Остаток'];
    for (let i = 0; i < tableHeadCells.length; i++) {
      const tableHeadCell = document.createElement('th');
      tableHeadCell.textContent = tableHeadCells[i];
      tableHeadRow.appendChild(tableHeadCell);
    }

    const tableBody = document.createElement('tbody');
    table.appendChild(tableBody);

    for (let i = 0; i < rasVCre.length; i++) {
      const tableRow = document.createElement('tr');
      tableBody.appendChild(tableRow);

      const tableCells = [
        rasVCre[i].month,
        rasVCre[i].payment,
        rasVCre[i].interest,
        rasVCre[i].principal,
        rasVCre[i].extraPayment,
        rasVCre[i].balance
      ];

      for (let j = 0; j < tableCells.length; j++) {
        const tableCell = document.createElement('td');
        tableCell.textContent = tableCells[j];
        tableRow.appendChild(tableCell);
      }
    };

    const resultDiv2 = document.createElement('div');
    resultDiv2.className = 'result__div__pay';
    calcSection2.appendChild(resultDiv2);

    let summCrediTab = document.createElement('p');
    summCrediTab.classList.add(`text`, `text__v__credit`);
    summCrediTab.textContent = `Вы осуществляете погашение кредита за ${Number(rasVCre.length)} месяцев вместо ${formDataResult.danoCreditTermCredit} месяцев`;
    resultDiv2.appendChild(summCrediTab);

    let summCrediTabCom = document.createElement('p');
    summCrediTabCom.classList.add(`text`, `text__v__credit`);
    summCrediTabCom.textContent = `С учетом того что каждый месяц вы будете брать рассрочку на ${formDataResult.creditTwoCredit} и вносить ее в кредит`;
    resultDiv2.appendChild(summCrediTabCom);

    return rasVCre; // Resolve the promise with the result
  }

  //Функция долговой нагрузки
  function debtBurden(rasVCre, dolgN__com) {
    //создаем div
    const calcSection3 = document.getElementById('calc');
    const resultDiv3 = document.createElement('div');
    resultDiv3.className = 'result__div__pay';
    calcSection3.appendChild(resultDiv3);

    // Создаем параграфы для вывода данных
    let debtBurden = document.createElement('h2');
    debtBurden.classList.add(`text`, `calc__subtitle`);
    debtBurden.textContent = `Долговая нагрузка`;
    resultDiv3.appendChild(debtBurden);


    // Создаем таблицу
    let table = document.createElement('table');
    table.className = 'table table__debtBurden';
    resultDiv3.appendChild(table);

    // Создаем заголовок таблицы
    let thead = document.createElement('thead');
    table.appendChild(thead);
    let tr = document.createElement('tr');
    thead.appendChild(tr);
    let th1 = document.createElement('th');
    th1.textContent = 'Месяц';
    tr.appendChild(th1);
    let th2 = document.createElement('th');
    th2.textContent = 'Долговая нагрузка';
    tr.appendChild(th2);
    let th3 = document.createElement('th');
    th3.textContent = 'Разница долговой нагрузки';
    tr.appendChild(th3);

    // Создаем тело таблицы
    let tbody = document.createElement('tbody');
    table.appendChild(tbody);

    let dolgNResults = [];
    let accumulatedExtraPayment = 0; // переменная для накопления extraPayment

    for (let i = 0; i < Math.max(dolgN__com.length, rasVCre.length); i++) {
      let dolgNRassPayment = i < dolgN__com.length ? Number(dolgN__com[i].payment) : 0;
      let rasVCrePayment = i < rasVCre.length ? Number(rasVCre[i].payment) : 0;
      let extraPayment = dolgN__com[0].payment; // добавляем ежемесячную рассрочку
      accumulatedExtraPayment += extraPayment; // накапливаем extraPayment
      let dolgNResult = dolgNRassPayment + rasVCrePayment + accumulatedExtraPayment;
      if (i > formDataResult.creditTwoTermCredit) {
        accumulatedExtraPayment -= extraPayment;
      }

      if (i === 0) {
        dolgNResult = rasVCrePayment + extraPayment;
      } else {
        dolgNResult = dolgNRassPayment + rasVCrePayment + accumulatedExtraPayment - extraPayment;
      }
      let month = i + 1;

      let paymentDiff;
      if (i === 0) {
        paymentDiff = 0; // или другое значение по умолчанию
      } else {
        paymentDiff = dolgNResult - dolgNResults[i - 1].dolgNResult;
      }
      // Создаем строку таблицы
      let tr = document.createElement('tr');
      tbody.appendChild(tr);
      let td1 = document.createElement('td');
      td1.textContent = month;
      tr.appendChild(td1);
      let td2 = document.createElement('td');
      td2.textContent = dolgNResult.toFixed(2);
      tr.appendChild(td2);

      let td3 = document.createElement('td');
      td3.textContent = paymentDiff.toFixed(2);
      tr.appendChild(td3);

      dolgNResults.push({
        dolgNResult: dolgNResult.toFixed(2),
        month: month,
        paymentDiff: paymentDiff.toFixed(2),
      });
    };

    let debtBurden3 = document.createElement('p');
    debtBurden3.classList.add(`text`, `text__debt__burden`);
    debtBurden3.textContent = `Долговая нагрузка будет ${dolgNResults.length} месяца`;
    resultDiv3.appendChild(debtBurden3);

    let debtBurden4 = document.createElement('p');
    debtBurden4.classList.add(`text`, `text__debt__burden`);
    debtBurden4.textContent = `Конечный платеж будет равен ${dolgNResults[dolgNResults.length - 1].dolgNResult} этот платеж будет 
    сроком на ${formDataResult.creditTwoTermCredit} месяцев который будет ежемесячно уменьшаться на ${dolgN__com[0].payment} рублей. 
    Наша максимальная долговая нагрузка будет равна ${Math.max(...dolgNResults.map(result => Number(result.dolgNResult)))} а так же 
    после ${formDataResult.creditTwoTermCredit} месяца ваша долговая нагрузка будет падать на ${dolgNResults[formDataResult.creditTwoTermCredit].paymentDiff}`;
    resultDiv3.appendChild(debtBurden4);

    return dolgNResults;
  };

  //функция для Ежемесячной разницы долговой нагрузки
  function results(formDataResult, dolgN, dolgN__com, rasVCre, dolgNResults) {

    const calcSection4 = document.getElementById('calc');
    const resultDiv4 = document.createElement('div');
    resultDiv4.className = 'result__div__pay';
    calcSection4.appendChild(resultDiv4);

    // Создаем параграфы для вывода данных
    let results = document.createElement('h2');
    results.classList.add(`text`, `calc__subtitle`);
    results.textContent = `Итоги:`;
    resultDiv4.appendChild(results);

    let resultsText = document.createElement('p');
    resultsText.classList.add(`text`, `results__text`);
    resultsText.textContent = `Итоги: При взятии рассрочки в ${formDataResult.creditTwoCredit}рублей под ${formDataResult.creditTwoPercentages}% годовых 
    сроком на ${formDataResult.creditTwoTermCredit} месяцев и вкладывая ее в кредит ${formDataResult.danoCreditCredit} 
    который взят под ${formDataResult.danoCreditPercentages}% годовых`;
    resultDiv4.appendChild(resultsText);

    let resultsText2 = document.createElement('p');
    resultsText2.classList.add(`text`, `results__text`);
    resultsText2.textContent = `
    Мы имеем: Ежемесячно уменьшающийся платеж по кредиту.
    Растущую долговую нагрузку на срок рассрочки, максимальную долговую нагрузку равной ${Math.max(...dolgNResults.map(result => Number(result.dolgNResult)))}
    Погашение кредита через ${Number(rasVCre.length)} месяцев.
    После того как кредит будет полностью погашен, останется платеж, который равен ${dolgNResults[dolgNResults.length - 1].dolgNResult} рублей сроком на ${formDataResult.creditTwoTermCredit} месяцев, который будет ежемесячно уменьшаться на ${dolgN__com[0].payment} рублей.    А так же за ${dolgNResults.length} месяцев - вещей равных сумме ${formDataResult.creditTwoCredit * dolgNResults.length} рублей
    `;
    resultDiv4.appendChild(resultsText2);

  };
})();




