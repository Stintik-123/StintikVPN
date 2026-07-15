let currentLanguage = 'ru';
let isDarkTheme = true;
let isHighContrast = false;

window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    hidePreloader();
    setupListeners();
});

function hidePreloader() {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        const content = document.getElementById('main-content');
        if (preloader) preloader.classList.add('hidden');
        if (content) content.classList.remove('hidden');
    }, 1500);
}

function initTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    isDarkTheme = saved === 'dark';
    applyTheme();
    
    if (localStorage.getItem('contrast') === 'on') {
        isHighContrast = true;
        document.body.classList.add('high-contrast');
    }
}

function applyTheme() {
    if (isDarkTheme) {
        document.body.classList.remove('light-theme');
    } else {
        document.body.classList.add('light-theme');
    }
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    const toggle = document.getElementById('theme-toggle');
    if (toggle) toggle.textContent = isDarkTheme ? '🌙' : '☀️';
}

function initLanguage() {
    const saved = localStorage.getItem('language') || 'ru';
    currentLanguage = saved;
    updateLanguage();
}

function updateLanguage() {
    document.querySelectorAll('[data-ru][data-en]').forEach(el => {
        const text = el.getAttribute(`data-${currentLanguage}`);
        if (text) el.textContent = text;
    });
    const select = document.getElementById('language-select');
    if (select) select.value = currentLanguage;
    localStorage.setItem('language', currentLanguage);
}

function setupListeners() {
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
        isDarkTheme = !isDarkTheme;
        applyTheme();
    });

    document.getElementById('contrast-toggle')?.addEventListener('click', () => {
        isHighContrast = !isHighContrast;
        document.body.classList.toggle('high-contrast');
        localStorage.setItem('contrast', isHighContrast ? 'on' : 'off');
    });

    document.getElementById('language-select')?.addEventListener('change', (e) => {
        currentLanguage = e.target.value;
        updateLanguage();
    });

    document.querySelectorAll('.faq-header').forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            document.querySelectorAll('.faq-item.active').forEach(el => el.classList.remove('active'));
            if (!item.classList.contains('active')) item.classList.add('active');
        });
    });

    document.querySelectorAll('.btn-copy').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const text = btn.getAttribute('data-copy');
            navigator.clipboard.writeText(text).then(() => showModal());
        });
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterSubs(this.getAttribute('data-filter'));
        });
    });
}

function toggleFAQ(el) {
    const item = el.parentElement;
    document.querySelectorAll('.faq-item.active').forEach(e => e.classList.remove('active'));
    if (!item.classList.contains('active')) item.classList.add('active');
}

function filterSubs(filter) {
    document.querySelectorAll('.sub-card').forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function showModal() {
    const modal = document.getElementById('copy-modal');
    if (modal) {
        modal.classList.add('active');
        setTimeout(() => modal.classList.remove('active'), 2500);
    }
}