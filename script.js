document.addEventListener('DOMContentLoaded', function() {
    
    const modal = document.getElementById('callbackModal');
    const closeModalBtn = document.getElementById('closeModal');
    const openBtns = document.querySelectorAll('.open-modal-btn');

    if (modal && closeModalBtn) {
        openBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                modal.classList.add('active');
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu) mobileMenu.classList.remove('active');
            });
        });
        closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });
    }

    const tabs = document.querySelectorAll('.offer__tabs li');
    const imgElement = document.getElementById('offerImage');
    const checksList = document.getElementById('offerChecks');

    if (tabs.length > 0 && imgElement && checksList) {
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                tabs.forEach(t => t.classList.remove('is-active'));
                this.classList.add('is-active');
                imgElement.src = this.getAttribute('data-img');
                imgElement.alt = this.getAttribute('data-title');
                const newChecks = this.getAttribute('data-checks').split('|');
                checksList.innerHTML = ''; 
                newChecks.forEach(checkText => {
                    const li = document.createElement('li');
                    li.textContent = checkText;
                    checksList.appendChild(li);
                });
            });
        });
    }

    const burgerBtn = document.getElementById('burgerBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener('click', (e) => { e.preventDefault(); mobileMenu.classList.add('active'); });
    }
    if (closeMenuBtn && mobileMenu) {
        closeMenuBtn.addEventListener('click', (e) => { e.preventDefault(); mobileMenu.classList.remove('active'); });
    }
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.remove('active'));
        });
    }

    const formEvents = {
        'form_1': 'otpravka_form_1',
        'form_2': 'otpravka_form_2',
        'form_3': 'otpravka_form_3'
    };

    const forms = document.querySelectorAll('.js-form');
    
    forms.forEach((form) => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const nameInput = form.querySelector('.js-input-name');
            const phoneInput = form.querySelector('.js-input-phone');
            const submitBtn = form.querySelector('button[type="submit"]');
            
            let isValid = true;

            nameInput.style.borderBottom = '1px solid #E3E3E3';
            phoneInput.style.borderBottom = '1px solid #E3E3E3';

            if (nameInput.value.trim().length < 2) {
                nameInput.style.borderBottom = '2px solid red';
                isValid = false;
            }
            const cleanPhone = phoneInput.value.replace(/\D/g, '');
            if (cleanPhone.length < 10) {
                phoneInput.style.borderBottom = '2px solid red';
                isValid = false;
            }

            if (!isValid) {
                alert('Пожалуйста, проверьте правильность заполнения полей.\nИмя должно быть не короче 2 символов, а телефон содержать минимум 10 цифр.');
                return;
            }

            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Отправка...';
            submitBtn.disabled = true;

            setTimeout(() => {
                const formId = form.id;
                const eventName = formEvents[formId] || 'otpravka_form_default';
                if (window.dataLayer) {
                    window.dataLayer.push({ 'event': eventName });
                }

                alert('Спасибо! Ваша заявка отправлена. Мы скоро свяжемся с вами.');
                form.reset(); 
                
                if (modal && modal.classList.contains('active')) {
                    modal.classList.remove('active');
                }

                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    });
});