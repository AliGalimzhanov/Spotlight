// Инициализация EmailJS
(function() {
    // Замените 'YOUR_PUBLIC_KEY' на ваш публичный ключ из EmailJS
    emailjs.init('pHluERPn1bFy_cYoE');
})();

// Получаем элементы формы
const form = document.querySelector('form');
const nameInput = document.querySelector('input[placeholder="name"]');
const emailInput = document.querySelector('input[placeholder="email"]');
const numberInput = document.querySelector('input[placeholder="number"]');
const subjectInput = document.querySelector('input[placeholder="subject"]');
const messageInput = document.querySelector('textarea[placeholder="your message"]');
const submitBtn = document.querySelector('.btn');

// Функция для отправки email
function sendEmail(e) {
    e.preventDefault(); // Предотвращаем стандартное поведение формы

    // Проверяем заполненность обязательных полей
    if (!nameInput.value || !emailInput.value || !messageInput.value) {
        alert('Пожалуйста, заполните все обязательные поля (имя, email, сообщение)');
        return;
    }

    // Показываем индикатор загрузки
    submitBtn.value = 'Отправка...';
    submitBtn.disabled = true;

    // Параметры для отправки email
    const templateParams = {
        from_name: nameInput.value,
        from_email: emailInput.value,
        phone_number: numberInput.value || 'Не указан',
        subject: subjectInput.value || 'Сообщение с сайта',
        message: messageInput.value,
        to_name: 'Администратор', // Можете изменить на свое имя
    };

    // Отправка email через EmailJS
    // Замените 'YOUR_SERVICE_ID' и 'YOUR_TEMPLATE_ID' на ваши ID
    emailjs.send('service_ju454tf', 'template_uwvv4ae', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Успешная отправка
            alert('Сообщение успешно отправлено!');
            
            // Очищаем форму
            form.reset();
            
        }, function(error) {
            console.log('FAILED...', error);
            
            // Ошибка отправки
            alert('Произошла ошибка при отправке сообщения. Попробуйте еще раз.');
        })
        .finally(function() {
            // Восстанавливаем кнопку
            submitBtn.value = 'send messsage';
            submitBtn.disabled = false;
        });
}

// Добавляем обработчик события на форму
form.addEventListener('submit', sendEmail);

// Дополнительная валидация email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Проверка email при вводе
emailInput.addEventListener('blur', function() {
    if (this.value && !validateEmail(this.value)) {
        alert('Пожалуйста, введите корректный email адрес');
        this.focus();
    }
});

// Проверка телефона (только цифры)
numberInput.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9+\-\s]/g, '');
});