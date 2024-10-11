//footer click
document.addEventListener('DOMContentLoaded', function () {

  const items = document.querySelectorAll('.footer__item');

  items.forEach((item) => {
    const h3 = item.querySelector('h3');
    const p = item.querySelector('p');
    const svg = item.querySelector('.footer__link');

    h3.addEventListener('click', () => {
      p.style.display = p.style.display === 'block' ? 'none' : 'block';
    });

    svg.addEventListener('click', () => {
      p.style.display = p.style.display === 'block' ? 'none' : 'block';
    });
  });


  const input1 = document.getElementById('summ__credit');
  const input2 = document.getElementById('percentages');
  const input3 = document.getElementById('termCredit');
  const input4 = document.getElementById('summ__credit__com');
  const input5 = document.getElementById('percentages__com');
  const input6 = document.getElementById('termCredit__com');



  function addSpacesToInput(input) {
    input.addEventListener('input', function () {
      const value = this.value.replace(/\s+/g, '');
      const formattedValue = value.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
      this.value = formattedValue;
    });
  }
  addSpacesToInput(input1);
  addSpacesToInput(input2);
  addSpacesToInput(input3);
  addSpacesToInput(input4);
  addSpacesToInput(input5);
  addSpacesToInput(input6);

  function restrictInputToNumbers(inputField) {
    inputField.addEventListener('keypress', function (event) {
      if (!/\d/.test(String.fromCharCode(event.keyCode))) {
        event.preventDefault();
      }
    });
  }
  restrictInputToNumbers(input1);
  restrictInputToNumbers(input2);
  restrictInputToNumbers(input3);
  restrictInputToNumbers(input4);
  restrictInputToNumbers(input5);
  restrictInputToNumbers(input6);

});  