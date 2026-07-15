// Языки
const translations = {
    ru: {
        'Интернет свобода ближе, чем кажется': 'Интернет свобода ближе, чем кажется',
        'Обойди блокировки и пользуйся интернетом свободно': 'Обойди блокировки и пользуйся интернетом свободно',
        '📊 Монит��р Свободы': '📊 Монитор Свободы',
        'Новая блокировка VPN': 'Новая блокировка VPN',
        'Роскомнадзор начал блокировать новые IP адреса провайдеров VPN': 'Роскомнадзор начал блокировать новые IP адреса провайдеров VPN',
        'Обход блокировок DNS': 'Обход блокировок DNS',
        'Новый метод позволяет обойти фильтрацию DNS на уровне провайдера': 'Новый метод позволяет обойти фильтрацию DNS на уровне провайдера',
        'ByeDPI работает!': 'ByeDPI работает!',
        'Пользователи подтвердили работу ByeDPI в последнее время': 'Пользователи подтвердили работу ByeDPI в последнее время',
        'Звезд': 'Звезд',
        'Подписчиков': 'Подписчиков',
        'Свободы': 'Свободы',
        '🔍 Проверка Соединения': '🔍 Проверка Соединения',
        'Проверить IP': 'Проверить IP',
        'Проверить DNS': 'П��оверить DNS',
        'Проверить скорость': 'Проверить скорость',
        '📚 Гайды и Инструкции': '📚 Гайды и Инструкции',
        'Нужна помощь?': 'Нужна помощь?',
        'Свяжись с нашей поддержкой': 'Свяжись с нашей поддержкой',
        '❓ Часто Задаваемые Вопросы': '❓ Часто Задаваемые Вопросы',
        '🙏 Спасибо Нашим Творцам': '🙏 Спасибо Нашим Творцам',
        'Создатель': 'Создатель',
        'Помощник': 'Помощник',
        'Сделано людьми для людей': 'Сделано людьми для людей',
    },
    en: {
        'Интернет свобода ближе, чем кажется': 'Internet freedom is closer than you think',
        'Обойди блокировки и пользуйся интернетом свободно': 'Bypass blocks and use the internet freely',
        '📊 Монитор Свободы': '📊 Freedom Monitor',
        'Новая блокировка VPN': 'New VPN Block',
        'Роскомнадзор начал блокировать новые IP адреса провайдеров VPN': 'Roskomnadzor began blocking new VPN provider IP addresses',
        'Обход блокировок DNS': 'DNS Block Bypass',
        'Новый метод позволяет обойти фильтрацию DNS на уровне провайдера': 'New method allows bypassing DNS filtering at the provider level',
        'ByeDPI работает!': 'ByeDPI Works!',
        'Пользователи подтвердили работу ByeDPI в последнее время': 'Users confirmed ByeDPI operation recently',
        'Звезд': 'Stars',
        'Подписчиков': 'Subscribers',
        'Свободы': 'Freedom',
        '🔍 Проверка Соединения': '🔍 Connection Check',
        'Проверить IP': 'Check IP',
        'Проверить DNS': 'Check DNS',
        'Проверить скорость': 'Check Speed',
        '📚 Гайды и Инструкции': '📚 Guides and Instructions',
        'Нужна помощь?': 'Need help?',
        'Свяжись с нашей поддержкой': 'Contact our support',
        '❓ Часто Задаваемые Вопросы': '❓ Frequently Asked Questions',
        '🙏 Спасибо Нашим Творцам': '🙏 Thanks to Our Creators',
        'Создатель': 'Creator',
        'Помощник': 'Assistant',
        'Сделано людьми для людей': 'Made by people for people',
    }
};

// Состояние
let currentLanguage = 'ru';
let isDarkTheme = true;
let isHighContrast = false;

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeLanguage();
    loadGithubStats();
    setupEventListeners();
    hidePreloader();
});

// Скрыть прелоадер
function hidePreloader() {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        const mainContent = document.getElementById('main-content');
        
        if (preloader) preloader.classList.add('hidden');
        if (mainContent) mainContent.classList.remove('hidden');
    }, 1500);
}

// Инициализация темы
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    isDarkTheme = savedTheme === 'dark';
    applyTheme();
}

// Применить тему
function applyTheme() {
    const body = document.body;
    if (isDarkTheme) {
        body.classList.remove('light-theme');
    } else {
        body.classList.add('light-theme');
    }
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    updateThemeIcon();
}

// Обновить иконку темы
function updateThemeIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = isDarkTheme ? '🌙' : '☀️';
    }
}

// Инициализация языка
function initializeLanguage() {
    const savedLanguage = localStorage.getItem('language') || 'ru';
    currentLanguage = savedLanguage;
    updateLanguage();
}

// Обновить язык
function updateLanguage() {
    document.querySelectorAll('[data-ru][data-en]').forEach(element => {
        const key = element.getAttribute(`data-${currentLanguage}`);
        if (key) {
            element.textContent = key;
        }
    });
    
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.value = currentLanguage;
    }
    
    localStorage.setItem('language', currentLanguage);
}

// Загрузить GitHub статистику
async function loadGithubStats() {
    try {
        const response = await fetch('https://api.github.com/repos/Stintik-123/StintikVPN');
        const data = await response.json();
        
        const starsCount = document.getElementById('stars-count');
        if (starsCount) {
            starsCount.textContent = data.stargazers_count || '99';
            animateNumber(starsCount, data.stargazers_count || 99);
        }
    } catch (error) {
        console.error('Error loading GitHub stats:', error);
    }
}

// Анимация чисел
function animateNumber(element, finalNumber) {
    let currentNumber = 0;
    const increment = Math.ceil(finalNumber / 50);
    
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
            currentNumber = finalNumber;
            clearInterval(timer);
        }
        element.textContent = currentNumber;
    }, 30);
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Переключение темы
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            isDarkTheme = !isDarkTheme;
            applyTheme();
        });
    }

    // Высокий контраст
    const contrastToggle = document.getElementById('contrast-toggle');
    if (contrastToggle) {
        contrastToggle.addEventListener('click', () => {
            isHighContrast = !isHighContrast;
            document.body.classList.toggle('high-contrast');
            localStorage.setItem('contrast', isHighContrast ? 'on' : 'off');
        });
    }

    // Выбор языка
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            currentLanguage = e.target.value;
            updateLanguage();
        });
    }

    // Гайды (аккордеон)
    document.querySelectorAll('.guide-header').forEach(header => {
        header.addEventListener('click', function() {
            const parent = this.parentElement;
            parent.classList.toggle('active');
        });
    });

    // FAQ (аккордеон)
    document.querySelectorAll('.faq-header').forEach(header => {
        header.addEventListener('click', function() {
            const parent = this.parentElement;
            parent.classList.toggle('active');
        });
    });

    // Копирование
    document.querySelectorAll('[data-copy]').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.getAttribute('data-copy');
            copyToClipboard(text);
        });
    });

    // Ссылки на новости
    document.querySelectorAll('.news-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!this.hasAttribute('href') || this.hasAttribute('href') === '#') {
                e.preventDefault();
                showCopyModal();
            }
        });
    });
}

// Копировать в буфер обмена
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showCopyModal();
    }).catch(err => {
        console.error('Error copying:', err);
    });
}

// Показать модаль копирования
function showCopyModal() {
    const modal = document.getElementById('copy-modal');
    if (modal) {
        modal.classList.add('active');
        setTimeout(() => {
            modal.classList.remove('active');
        }, 3000);
    }
}

// Переключить гайд
function toggleGuide(element) {
    const parent = element.parentElement;
    parent.classList.toggle('active');
}

// Переключить FAQ
function toggleFAQ(element) {
    const parent = element.parentElement;
    parent.classList.toggle('active');
}

// Проверить ссылку
async function checkLink(url) {
    try {
        const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });
        return true;
    } catch (error) {
        return false;
    }
}

// Smooth scroll для якорей
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Загрузить контрастный режим из localStorage
window.addEventListener('DOMContentLoaded', () => {
    const contrastMode = localStorage.getItem('contrast');
    if (contrastMode === 'on') {
        isHighContrast = true;
        document.body.classList.add('high-contrast');
    }
});

// Lazy loading изображений
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// Проверка соединения при клике на кнопки проверки
document.querySelectorAll('.check-card').forEach(card => {
    card.addEventListener('click', async function(e) {
        const href = this.getAttribute('href');
        if (!href.startsWith('http')) {
            e.preventDefault();
            console.log('Checking connection to:', href);
        }
    });
});

// Экспорт функций для использования в HTML
window.toggleGuide = toggleGuide;
window.toggleFAQ = toggleFAQ;
window.copyToClipboard = copyToClipboard;
window.checkLink = checkLink;