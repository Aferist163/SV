document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector('.selectWrapper');
  const select = wrapper.querySelector('.custom-select');
  const selected = wrapper.querySelector('.selected');
  const options = select.querySelectorAll('.options li');

  selected.addEventListener('click', (e) => {
    e.stopPropagation(); 
    select.classList.toggle('open');
  });

  document.addEventListener('click', () => {
    select.classList.remove('open');
  });

  options.forEach(opt => {
    opt.addEventListener('click', () => {
      const lang = opt.getAttribute('data-value') || opt.innerText.toLowerCase(); 
      selected.innerText = opt.innerText; 
      select.classList.remove('open'); 
      loadLanguage(lang);
    });
  });

  function loadLanguage(lang) {
    fetch(`./locales/${lang}.json`)
      .then(res => res.json())
      .then(translations => {
        document.querySelectorAll("[data-i18n]").forEach(el => {
          const key = el.getAttribute("data-i18n");
          el.innerHTML = translations[key] || key;
        });
      })
      .catch(err => console.error("Error loading language file:", err));
  }

  loadLanguage('pl');
});

 if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    document.querySelector('.student_id').classList.add('ios');
  }