
// Вы можете рассмотреть добавление некоторых обработок ошибок в функцию calculateCredit для обработки случаев, когда входные значения являются недопустимыми (например, отрицательная сумма кредита, процентная ставка или срок кредита).
// Вы можете рассмотреть добавление форматирования к выходным значениям, например, округления их до двух десятичных знаков с помощью toFixed(2).
// В функции createResultDiv вы создаете новый элемент resultDiv, но не добавляете его к элементу heroSection. Вы должны добавить heroSection.appendChild(resultDiv); в конце функции.
// Вы можете рассмотреть добавление некоторых стилей CSS, чтобы сделать вывод более привлекательным.



(function () {
  // Создаем функцию, которая собирает данные из полей ввода
  function createCalcForm() {
    // Получаем элементы
    const form = document.getElementById('hero__form');
    const summCreditInput = document.getElementById('summ__credit');
    const percentagesInput = document.getElementById('percentages');
    const termCreditInput = document.getElementById('termCredit');
    const extraPaymentInput = document.getElementById('extraPayment');

    // Добавляем обработчик события клика на кнопку

    form.addEventListener('submit', function (e) {
      e.preventDefault(); // предотвратить стандартное действие браузера

      // Собираем данные из полей ввода
      const summCreditValue = parseFloat(summCreditInput.value);
      const percentagesValue = parseFloat(percentagesInput.value);
      const termCreditValue = parseFloat(termCreditInput.value);
      const extraPaymentValue = parseFloat(extraPaymentInput.value);

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

      let danoCredit = {
        credit: parseFloat(summCreditInput.value),
        percentages: parseFloat(percentagesInput.value),
        termCredit: parseFloat(termCreditInput.value),
        extraPayment: parseFloat(extraPaymentInput.value)
      };
      // Создаем функцию, которая создает div элемент для отображения данных
      createResultDiv(danoCredit);
    });
  }

  // Создаем функцию, которая создает div элемент для отображения данных
  function createResultDiv(danoCredit) {
    // Удаляем старый div элемент с результатами
    const oldResultDiv = document.querySelector('.result-div');
    if (oldResultDiv) {
      oldResultDiv.remove();
    }

    // Создаем новый div элемент
    const resultDiv = document.createElement('div');
    resultDiv.className = 'result-div';

    // Создаем параграфы для вывода данных
    let summCreditP = document.createElement('p');
    summCreditP.classList.add(`hero__text`);
    summCreditP.textContent = `Сумма кредита: ${danoCredit.credit}`;

    let percentagesP = document.createElement('p');
    percentagesP.classList.add(`hero__text`);
    percentagesP.textContent = `Процентная ставка: ${danoCredit.percentages}%`;

    let termCreditP = document.createElement('p');
    termCreditP.classList.add(`hero__text`);
    termCreditP.textContent = `Срок: ${danoCredit.termCredit} месяцев`;

    let extraPaymentP = document.createElement('p');
    extraPaymentP.classList.add(`hero__text`);
    extraPaymentP.textContent = `Досрочное погашение: ${danoCredit.extraPayment}`;

    // Добавляем параграфы к div элементу
    resultDiv.appendChild(summCreditP);
    resultDiv.appendChild(percentagesP);
    resultDiv.appendChild(termCreditP);
    resultDiv.appendChild(extraPaymentP);

    // Получаем элемент с id "hero"
    const heroSection = document.getElementById('hero');

    // Добавляем div элемент к элементу с id "hero"
    heroSection.appendChild(resultDiv);




    let dolgN = calculateCredit(danoCredit.credit, danoCredit.percentages, danoCredit.termCredit, danoCredit.extraPayment);
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

    // Создаем параграфы для вывода данных
    let summCredi = document.createElement('p');
    summCredi.classList.add(`hero__text`);
    summCredi.textContent = `платеж по кредиту равен ${dolgN[0].payment}`;
    // Добавляем параграф к div элементу
    resultDiv.appendChild(summCredi);

    if (danoCredit.extraPayment > 0) {
      let summCredi1 = document.createElement('p');
      summCredi1.classList.add(`hero__text`);
      summCredi1.textContent = `при досрочном погашении вы загасите кредит через ${dolgN.length} месяцев`;
      resultDiv.appendChild(summCredi1);
    }


  }


  // Вызываем функцию createCalcForm
  createCalcForm();




})();


