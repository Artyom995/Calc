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