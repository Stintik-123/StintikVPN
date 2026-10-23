/**
 * StintikVPN - Modern JavaScript
 * Полный редизайн с новым функционалом
 */

'use strict';

// ========================================
// Configuration
// ========================================

const CONFIG = {
    // Animation settings
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    scrollBehavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    
    // Theme storage key
    themeKey: 'stintikvpn-theme',
    
    // Toast duration
    toastDuration: 2000,
    
    // Copy button reset timeout
    copyResetTimeout: 1800
};

// ========================================
// State Management
// ========================================

const state = {
    data: null,
    currentFilter: 'all',
    searchQuery: '',
    theme: null,
    isNavOpen: false,
    lastFocused: null
};

// ========================================
// Utility Functions
// ========================================

/**
 * Escape HTML entities
 */
function escapeHtml(text) {
    if (text === null || text === undefined) return '';
    const div = document.createElement('div');
    div.textContent = String(text);
    return div.innerHTML;
}

/**
 * Truncate text with ellipsis
 */
function truncate(text, length = 50) {
    if (typeof text !== 'string') return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
}

/**
 * Get URL domain for display
 */
function getDomain(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.replace('www.', '');
    } catch {
        return url;
    }
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    if (!dateString) return '—';
    
    // Try to parse different date formats
    const formats = [
        'DD.MM.YYYY',
        'MM/DD/YYYY',
        'YYYY-MM-DD',
        'DD MM YYYY',
        'MMM D, YYYY'
    ];
    
    let date = new Date(dateString);
    if (isNaN(date.getTime())) {
        // Try to parse manually
        const parts = dateString.split(/[./\- ]/);
        if (parts.length >= 3) {
            const day = parseInt(parts[0]);
            const month = parseInt(parts[1]) - 1;
            const year = parseInt(parts[2]);
            date = new Date(year, month, day);
        }
    }
    
    if (isNaN(date.getTime())) {
        return dateString;
    }
    
    return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

// ========================================
// Theme Management
// ========================================

function setTheme(theme) {
    state.theme = theme;
    
    if (theme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        document.body.classList.remove('theme-dark');
        document.body.classList.add('theme-light');
    } else {
        document.body.removeAttribute('data-theme');
        document.body.classList.remove('theme-light');
        document.body.classList.add('theme-dark');
    }
    
    try {
        localStorage.setItem(CONFIG.themeKey, theme);
    } catch (e) {
        console.warn('Cannot save theme preference:', e);
    }
    
    updateThemeIcons();
}

function getPreferredTheme() {
    try {
        const saved = localStorage.getItem(CONFIG.themeKey);
        if (saved === 'light' || saved === 'dark') {
            return saved;
        }
    } catch (e) {
        console.warn('Cannot read theme preference:', e);
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
    }
    
    return 'dark';
}

function updateThemeIcons() {
    const isLight = state.theme === 'light';
    const sunIcons = document.querySelectorAll('.theme-icon-sun');
    const moonIcons = document.querySelectorAll('.theme-icon-moon');
    
    sunIcons.forEach(icon => {
        icon.style.display = isLight ? 'none' : 'block';
    });
    
    moonIcons.forEach(icon => {
        icon.style.display = isLight ? 'block' : 'none';
    });
}

function toggleTheme() {
    setTheme(state.theme === 'light' ? 'dark' : 'light');
}

// ========================================
// Loading Screen
// ========================================

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, CONFIG.transitionSlow);
    }
}

// ========================================
// Navigation
// ========================================

function setNavOpen(open) {
    state.isNavOpen = open;
    const navLinks = document.querySelector('.nav-links');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (navLinks) {
        navLinks.classList.toggle('open', open);
    }
    
    if (navToggle) {
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    
    // Toggle body scroll
    if (open) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function toggleNav() {
    setNavOpen(!state.isNavOpen);
}

function closeNav() {
    setNavOpen(false);
}

// ========================================
// Scroll Effects
// ========================================

function handleScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

// ========================================
// Toast Notifications
// ========================================

function showToast(message, type = 'default') {
    const toast = document.getElementById('toast');
    const toastMessage = toast?.querySelector('.toast-message');
    
    if (!toast || !toastMessage) return;
    
    toastMessage.textContent = message;
    toast.className = 'toast';
    
    if (type === 'success') {
        toast.classList.add('success');
    } else if (type === 'error') {
        toast.classList.add('error');
    }
    
    toast.hidden = false;
    
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.hidden = true;
        }, 200);
    }, CONFIG.toastDuration);
}

// ========================================
// Clipboard Functions
// ========================================

function legacyCopy(text) {
    return new Promise((resolve) => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
        } catch (e) {
            console.warn('Legacy copy failed:', e);
        }
        
        document.body.removeChild(textarea);
        resolve();
    });
}

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text).catch(() => {
            return legacyCopy(text);
        });
    }
    return legacyCopy(text);
}

function handleCopy(url, button) {
    copyToClipboard(url).then(() => {
        if (button) {
            const originalText = button.textContent;
            button.classList.add('copied');
            button.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Скопировано!';
            
            setTimeout(() => {
                button.classList.remove('copied');
                button.textContent = originalText;
            }, CONFIG.copyResetTimeout);
        }
        
        showToast('Скопировано в буфер обмена', 'success');
    }).catch(() => {
        showToast('Не удалось скопировать', 'error');
    });
}

// ========================================
// Share Function
// ========================================

function shareUrl(url) {
    if (!navigator.share) {
        showToast('Шаринг не поддерживается на этом устройстве', 'error');
        return;
    }
    
    navigator.share({
        title: 'StintikVPN - Подписка',
        text: 'Проверьте эту VPN-подписку',
        url: url
    }).catch((e) => {
        if (e.name !== 'AbortError') {
            showToast('Ошибка при шаринге', 'error');
        }
    });
}

// ========================================
// QR Code Modal
// ========================================

function showQRCode(url) {
    const modal = document.getElementById('qr-modal');
    const qrContainer = document.getElementById('qrcode');
    
    if (!modal || !qrContainer) return;
    
    // Clear previous QR code
    qrContainer.innerHTML = '';
    
    if (typeof QRCode === 'undefined') {
        qrContainer.innerHTML = '<p style="color: var(--text-secondary); padding: 1rem;">QR-код не доступен. Скопируйте ссылку вручную.</p>';
        modal.showModal();
        return;
    }
    
    const isLight = state.theme === 'light';
    
    try {
        new QRCode(qrContainer, {
            text: url,
            width: 200,
            height: 200,
            colorDark: isLight ? '#1a1a20' : '#f5f5f7',
            colorLight: isLight ? '#ffffff' : '#0a0a0f',
            correctLevel: QRCode.CorrectLevel.M
        });
    } catch (e) {
        console.error('Failed to generate QR code:', e);
        qrContainer.innerHTML = '<p style="color: var(--text-secondary); padding: 1rem;">Не удалось сгенерировать QR-код</p>';
    }
    
    state.lastFocused = document.activeElement;
    modal.showModal();
}

function closeQRCode() {
    const modal = document.getElementById('qr-modal');
    if (!modal || !modal.open) return;
    
    modal.close();
    
    const qrContainer = document.getElementById('qrcode');
    if (qrContainer) {
        qrContainer.innerHTML = '';
    }
    
    if (state.lastFocused && state.lastFocused.focus) {
        state.lastFocused.focus();
    }
    state.lastFocused = null;
}

// ========================================
// Filter Functions
// ========================================

function setFilter(filter) {
    state.currentFilter = filter;
    
    // Update filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        const isActive = btn.dataset.filter === filter;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
    
    // Hide search if filter is not 'search'
    const searchContainer = document.getElementById('search-container');
    if (filter !== 'search' && searchContainer) {
        searchContainer.hidden = true;
        state.searchQuery = '';
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.value = '';
    }
    
    // Apply filter
    applyFilters();
}

function applyFilters() {
    if (!state.data) return;
    
    const { subscriptions, proxies } = state.data;
    const { currentFilter, searchQuery } = state;
    
    // Filter subscriptions
    const subList = document.getElementById('subs-list');
    if (subList && subscriptions) {
        subList.innerHTML = subscriptions
            .filter(sub => {
                // Category filter
                if (currentFilter !== 'all' && currentFilter !== 'search') {
                    if (sub.category !== currentFilter) return false;
                }
                
                // Search filter
                if (searchQuery) {
                    const query = searchQuery.toLowerCase();
                    const title = (sub.title || '').toLowerCase();
                    const note = (sub.note || '').toLowerCase();
                    const tag = (sub.tag || '').toLowerCase();
                    
                    if (!title.includes(query) && 
                        !note.includes(query) && 
                        !tag.includes(query) &&
                        !(sub.url || '').toLowerCase().includes(query)) {
                        return false;
                    }
                }
                
                return true;
            })
            .map(renderSubscription)
            .join('');
    }
    
    // Filter proxies (only by search)
    const proxyList = document.getElementById('proxies-list');
    if (proxyList && proxies) {
        proxyList.innerHTML = proxies
            .filter(proxy => {
                if (searchQuery) {
                    const query = searchQuery.toLowerCase();
                    const addr = (proxy.addr || '').toLowerCase();
                    return addr.includes(query) || (proxy.url || '').toLowerCase().includes(query);
                }
                return true;
            })
            .map(renderProxy)
            .join('');
    }
}

function handleSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    state.searchQuery = searchInput.value.trim();
    
    if (state.searchQuery) {
        setFilter('search');
    } else {
        setFilter('all');
    }
    
    applyFilters();
}

function clearSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = '';
        state.searchQuery = '';
        setFilter('all');
        applyFilters();
    }
}

// ========================================
// Render Functions
// ========================================

function renderSubscription(sub, index = 0) {
    const url = escapeHtml(sub.url);
    const title = escapeHtml(sub.title || 'Без названия');
    const note = escapeHtml(sub.note || '');
    const tag = escapeHtml(sub.tag || '');
    const category = sub.category || 'black';
    
    const tagClass = category === 'white' ? 'white' : '';
    
    return `
        <article class="sub-card" data-category="${category}" style="animation-delay: ${index * 0.1}s">
            <div class="sub-header">
                <span class="sub-tag ${tagClass}">${tag}</span>
            </div>
            <h3 class="sub-title">${title}</h3>
            ${note ? `<p class="sub-note">${note}</p>` : ''}
            <div class="sub-actions">
                <button class="action-btn qr" type="button" data-action="qr" data-url="${url}" aria-label="QR-код">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect width="5" height="5" x="3" y="3" rx="1"/>
                        <rect width="5" height="5" x="16" y="3" rx="1"/>
                        <rect width="5" height="5" x="3" y="16" rx="1"/>
                        <path d="M12 12h.01M12 12v.01M12 12h-3a3 3 0 0 0-3 3v.01"/>
                    </svg>
                    QR
                </button>
                <button class="action-btn copy" type="button" data-action="copy" data-url="${url}" aria-label="Скопировать">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect width="10" height="12" x="9" y="2" rx="1"/>
                        <path d="M5 12H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    Скопировать
                </button>
                <button class="action-btn share" type="button" data-action="share" data-url="${url}" aria-label="Поделиться">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="18" cy="5" r="3"/>
                        <circle cx="6" cy="12" r="3"/>
                        <circle cx="18" cy="19" r="3"/>
                        <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/>
                    </svg>
                    Поделиться
                </button>
            </div>
            <div class="sub-url" title="${url}">${truncate(url, 40)}</div>
        </article>
    `;
}

function renderProxy(proxy, index = 0) {
    const url = escapeHtml(proxy.url);
    const addr = escapeHtml(proxy.addr || 'Неизвестно');
    
    return `
        <article class="proxy-card" style="animation-delay: ${index * 0.1}s">
            <div class="proxy-addr">${addr}</div>
            <div class="proxy-actions">
                <button class="action-btn qr" type="button" data-action="qr" data-url="${url}" aria-label="QR-код">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect width="5" height="5" x="3" y="3" rx="1"/>
                        <rect width="5" height="5" x="16" y="3" rx="1"/>
                        <rect width="5" height="5" x="3" y="16" rx="1"/>
                        <path d="M12 12h.01M12 12v.01M12 12h-3a3 3 0 0 0-3 3v.01"/>
                    </svg>
                    QR
                </button>
                <button class="action-btn copy" type="button" data-action="copy" data-url="${url}" aria-label="Скопировать">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect width="10" height="12" x="9" y="2" rx="1"/>
                        <path d="M5 12H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    Скопировать
                </button>
                <button class="action-btn share" type="button" data-action="share" data-url="${url}" aria-label="Поделиться">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="18" cy="5" r="3"/>
                        <circle cx="6" cy="12" r="3"/>
                        <circle cx="18" cy="19" r="3"/>
                        <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/>
                    </svg>
                    Поделиться
                </button>
                <a href="${url}" target="_blank" rel="noopener noreferrer" class="action-btn" aria-label="Открыть">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                    </svg>
                    Открыть
                </a>
            </div>
        </article>
    `;
}

// ========================================
// Data Loading
// ========================================

function loadData() {
    // Try relative path first, then fallback to absolute path for GitHub Pages
    const dataUrl = 'data.json';
    
    fetch(dataUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            state.data = data;
            initPage();
            hideLoadingScreen();
        })
        .catch(error => {
            console.error('Failed to load data:', error);
            // Try fallback URL for GitHub Pages
            fetch('https://raw.githubusercontent.com/Stintik-123/StintikVPN/main/docs/data.json')
                .then(fallbackResponse => {
                    if (!fallbackResponse.ok) {
                        throw new Error(`Fallback HTTP ${fallbackResponse.status}`);
                    }
                    return fallbackResponse.json();
                })
                .then(data => {
                    state.data = data;
                    initPage();
                    hideLoadingScreen();
                })
                .catch(fallbackError => {
                    console.error('Failed to load fallback data:', fallbackError);
                    showErrorState();
                    hideLoadingScreen();
                });
        });
}

function showErrorState() {
    const subList = document.getElementById('subs-list');
    const proxyList = document.getElementById('proxies-list');
    
    if (subList) {
        subList.innerHTML = `
            <div class="error-message">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 8v4M12 16h.01"/>
                </svg>
                <p>Не удалось загрузить подписки</p>
                <a href="https://raw.githubusercontent.com/Stintik-123/StintikVPN/main/docs/data.json">Попробовать вручную</a>
            </div>
        `;
    }
    
    if (proxyList) {
        proxyList.innerHTML = `
            <div class="error-message">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 8v4M12 16h.01"/>
                </svg>
                <p>Не удалось загрузить прокси</p>
            </div>
        `;
    }
    
    showToast('Не удалось загрузить данные', 'error');
}

function initPage() {
    if (!state.data) return;
    
    // Update stats
    updateStats();
    
    // Update last updated date
    updateLastUpdated();
    
    // Render all items
    renderAllItems();
    
    // Apply initial filter
    applyFilters();
}

function updateStats() {
    if (!state.data) return;
    
    const subsCount = state.data.subscriptions ? state.data.subscriptions.length : 0;
    const proxiesCount = state.data.proxies ? state.data.proxies.length : 0;
    
    const subsCountEl = document.getElementById('subs-count');
    const proxiesCountEl = document.getElementById('proxies-count');
    
    if (subsCountEl) {
        subsCountEl.textContent = subsCount + '+';
    }
    
    if (proxiesCountEl) {
        proxiesCountEl.textContent = proxiesCount + '+';
    }
}

function updateLastUpdated() {
    if (!state.data || !state.data.updated) return;
    
    const dateEl = document.getElementById('proxy-date');
    if (dateEl) {
        dateEl.textContent = `— Обновлено: ${formatDate(state.data.updated)}`;
    }
}

function renderAllItems() {
    if (!state.data) return;
    
    // Render all subscriptions
    const subList = document.getElementById('subs-list');
    if (subList && state.data.subscriptions) {
        subList.innerHTML = state.data.subscriptions
            .map(renderSubscription)
            .join('');
    }
    
    // Render all proxies
    const proxyList = document.getElementById('proxies-list');
    if (proxyList && state.data.proxies) {
        proxyList.innerHTML = state.data.proxies
            .map(renderProxy)
            .join('');
    }
}

// ========================================
// Guide Toggle
// ========================================

function toggleGuide(button) {
    const guideCard = button.closest('.guide-card');
    if (!guideCard) return;
    
    const isOpen = guideCard.hasAttribute('open');
    
    // Close all other guides
    document.querySelectorAll('.guide-card').forEach(card => {
        if (card !== guideCard) {
            card.removeAttribute('open');
        }
    });
    
    // Toggle current guide
    if (isOpen) {
        guideCard.removeAttribute('open');
    } else {
        guideCard.setAttribute('open', '');
    }
}

// ========================================
// FAQ Toggle
// ========================================

function toggleFAQ(button) {
    const faqItem = button.closest('.faq-item');
    if (!faqItem) return;
    
    const isOpen = faqItem.hasAttribute('open');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.removeAttribute('open');
        }
    });
    
    // Toggle current FAQ item
    if (isOpen) {
        faqItem.removeAttribute('open');
    } else {
        faqItem.setAttribute('open', '');
    }
}

// ========================================
// Event Delegation
// ========================================

function handleClick(e) {
    const target = e.target.closest('[data-action]');
    
    // Handle action buttons
    if (target) {
        const action = target.dataset.action;
        const url = target.dataset.url;
        
        switch (action) {
            case 'qr':
                if (url) showQRCode(url);
                break;
            case 'copy':
                if (url) handleCopy(url, target);
                break;
            case 'share':
                if (url) shareUrl(url);
                break;
            case 'theme':
                toggleTheme();
                break;
            case 'nav':
                toggleNav();
                break;
            case 'close-qr':
                closeQRCode();
                break;
            case 'close-copy':
                const copyModal = document.getElementById('copy-modal');
                if (copyModal) copyModal.close();
                break;
        }
        return;
    }
    
    // Handle filter buttons
    const filterBtn = e.target.closest('.filter-btn');
    if (filterBtn) {
        const filter = filterBtn.dataset.filter;
        
        if (filter === 'search') {
            const searchContainer = document.getElementById('search-container');
            if (searchContainer) {
                searchContainer.hidden = false;
                const searchInput = document.getElementById('search-input');
                if (searchInput) {
                    searchInput.focus();
                }
            }
        } else {
            setFilter(filter);
        }
        return;
    }
    
    // Handle search clear
    const searchClear = e.target.closest('#search-clear');
    if (searchClear) {
        clearSearch();
        return;
    }
    
    // Handle guide toggle
    const guideToggle = e.target.closest('.guide-toggle');
    if (guideToggle) {
        toggleGuide(guideToggle);
        return;
    }
    
    // Handle FAQ toggle
    const faqToggle = e.target.closest('.faq-question');
    if (faqToggle) {
        toggleFAQ(faqToggle);
        return;
    }
    
    // Handle smooth scroll for anchor links
    const anchorLink = e.target.closest('a[href^="#"]');
    if (anchorLink) {
        const href = anchorLink.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            closeNav();
            target.scrollIntoView({
                behavior: CONFIG.scrollBehavior,
                block: 'start'
            });
        }
    }
}

function handleKeyDown(e) {
    // Close modals on Escape
    if (e.key === 'Escape') {
        closeQRCode();
        closeNav();
        
        const copyModal = document.getElementById('copy-modal');
        if (copyModal && copyModal.open) {
            copyModal.close();
        }
    }
    
    // Close nav on mobile when clicking outside
    if (e.key === 'Tab' && state.isNavOpen) {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && !navLinks.contains(e.target)) {
            closeNav();
        }
    }
}

function handleInput(e) {
    const searchInput = e.target.closest('#search-input');
    if (searchInput) {
        handleSearch();
    }
}

// ========================================
// Scroll to Top Button
// ========================================

function initScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
    `;
    scrollToTopBtn.setAttribute('aria-label', 'Вверх');
    scrollToTopBtn.setAttribute('title', 'Вверх');
    
    document.body.appendChild(scrollToTopBtn);
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 300) {
                    scrollToTopBtn.classList.add('visible');
                } else {
                    scrollToTopBtn.classList.remove('visible');
                }
                ticking = false;
            });
            ticking = true;
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: CONFIG.scrollBehavior
        });
    });
}

// ========================================
// Initialize
// ========================================

function init() {
    // Set theme
    setTheme(getPreferredTheme());
    
    // Load data
    loadData();
    
    // Add event listeners
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('input', handleInput);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize scroll to top
    initScrollToTop();
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth > 768 && state.isNavOpen) {
                closeNav();
            }
        }, 100);
    });
    
    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            // Refresh data when page becomes visible
            loadData();
        }
    });
    
    // Add CSS for scroll to top button
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 44px;
            height: 44px;
            background: var(--accent-gradient);
            border: none;
            border-radius: var(--radius-full);
            color: #ffffff;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: var(--shadow-lg);
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: opacity var(--transition-normal), 
                        visibility var(--transition-normal), 
                        transform var(--transition-normal);
            z-index: var(--z-fixed);
        }
        
        .scroll-to-top:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-xl);
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .scroll-to-top svg {
            width: 20px;
            height: 20px;
        }
        
        .error-message {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--space-md);
            padding: var(--space-xl);
            text-align: center;
            color: var(--text-secondary);
        }
        
        .error-message svg {
            color: var(--text-muted);
        }
        
        .error-message a {
            color: var(--accent);
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// Start Application
// ========================================

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export for debugging
window.StintikVPN = {
    state,
    setTheme,
    loadData,
    applyFilters
};
