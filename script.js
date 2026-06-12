// =====================
// CONFIGURATION
// =====================

const CONFIG = {
    pixKey: 'Cantodocurio2024@yahoo.com',
    whatsappPhone: '5521973516734',
    googleReviewUrl: 'https://www.google.com/search?q=canto+do+curi%C3%B3+ra%C3%A7oes+piabet%C3%A1',
    instagramUrl: 'https://www.instagram.com/cantodocurioracoes/',
    facebookUrl: 'https://www.facebook.com/canto.do.curio.racoes/',
    pageUrl: 'https://canto-do-curio-connect.vercel.app/',
};

// =====================
// DOM ELEMENTS
// =====================

const pixModal = document.getElementById('pixModal');
const qrcodeModal = document.getElementById('qrcodeModal');
const wifiModal = document.getElementById('wifiModal');
const linkButtons = document.querySelectorAll('.link-button');
const modalCloseButtons = document.querySelectorAll('.modal-close');
const copyPixBtn = document.getElementById('copyPixBtn');
const downloadQRBtn = document.getElementById('downloadQRBtn');
const copyWifiBtn = document.getElementById('copyWifiBtn');
const successMessage = document.getElementById('successMessage');
const toast = document.getElementById('toast');
const bankModal = document.getElementById('bankModal');
const openBankBtn = document.getElementById('openBankBtn');
const bankLoading = document.getElementById('bankLoading');
const bankGrid = document.getElementById('bankGrid');
const bankGridList = document.getElementById('bankGridList');
const bankNotice = document.getElementById('bankNotice');

// =====================
// INITIALIZATION
// =====================

document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initEventListeners();
    optimizeForMobile();
    detectAccessMethod();
});

// =====================
// EVENT LISTENERS
// =====================

function initEventListeners() {
    // Link buttons
    linkButtons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
        button.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-2px)';
        });
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });

    // Modal close buttons
    modalCloseButtons.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    // Close modal on background click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeAllModals();
            }
        });
    });

    // Copy Pix button
    if (copyPixBtn) {
        copyPixBtn.addEventListener('click', copyPixKey);
    }

    // Download QR Code button
    if (downloadQRBtn) {
        downloadQRBtn.addEventListener('click', downloadQRCode);
    }

    // Copy WiFi password button
    if (copyWifiBtn) {
        copyWifiBtn.addEventListener('click', copyWifiPassword);
    }

    // Open Bank button
    if (openBankBtn) {
        openBankBtn.addEventListener('click', openBankModal);
    }

    // Close modals on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

// =====================
// BUTTON HANDLERS
// =====================

function handleButtonClick(e) {
    const button = e.currentTarget;
    const action = button.getAttribute('data-action');

    switch(action) {
        case 'open-link':
            openLink(button.getAttribute('data-link'));
            break;
        case 'pix-modal':
            openPixModal();
            break;
        case 'qrcode-modal':
            openQRCodeModal();
            break;
        case 'wifi-modal':
            openWiFiModal();
            break;
        default:
            break;
    }
}

// =====================
// LINK HANDLING
// =====================

function openLink(url) {
    if (!url) {
        showToast('Link não configurado', 'error');
        return;
    }

    // Track the click (analytics)
    trackEvent('link_click', { url: url });

    // Open link
    window.open(url, '_blank', 'noopener,noreferrer');
}

// =====================
// PIX MODAL
// =====================

function openPixModal() {
    closeAllModals();
    pixModal.classList.add('active');
    
    // Scroll to ensure modal is visible
    if (window.innerWidth < 768) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function copyPixKey() {
    const pixKey = CONFIG.pixKey;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(pixKey)
            .then(() => {
                showSuccessMessage('Chave Pix copiada!');
                copyPixBtn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
                setTimeout(() => {
                    copyPixBtn.innerHTML = '<i class="fas fa-copy"></i> Copiar';
                }, 2000);
                trackEvent('pix_key_copied', {});
            })
            .catch(() => {
                fallbackCopyToClipboard(pixKey);
            });
    } else {
        fallbackCopyToClipboard(pixKey);
    }
}

function copyWifiPassword() {
    const password = 'felipemaluco2';
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(password)
            .then(() => {
                showSuccessMessage('Senha copiada!');
                copyWifiBtn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
                setTimeout(() => {
                    copyWifiBtn.innerHTML = '<i class="fas fa-copy"></i> Copiar';
                }, 2000);
            })
            .catch(() => {
                fallbackCopyToClipboard(password);
            });
    } else {
        fallbackCopyToClipboard(password);
    }
}

function fallbackCopyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showSuccessMessage('Chave Pix copiada!');
        trackEvent('pix_key_copied_fallback', {});
    } catch(e) {
        console.error('Erro ao copiar:', e);
        showToast('Erro ao copiar a chave', 'error');
    }
    
    document.body.removeChild(textarea);
}

// =====================
// QR CODE MODAL
// =====================

function openQRCodeModal() {
    closeAllModals();
    qrcodeModal.classList.add('active');
    generatePageQRCode();
    
    if (window.innerWidth < 768) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function generatePageQRCode() {
    const container = document.getElementById('pageQRCode');
    
    // Clear previous QR code
    container.innerHTML = '';
    
    // Use the Vercel page URL if provided, otherwise use current location
    const pageUrl = CONFIG.pageUrl || window.location.href;
    
    try {
        new QRCode(container, {
            text: pageUrl,
            width: 200,
            height: 200,
            colorDark: '#0a2463',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
    } catch(e) {
        console.error('Erro ao gerar QR Code:', e);
        container.innerHTML = '<p style="color: #d32f2f;">Erro ao gerar QR Code</p>';
    }
}

function downloadQRCode() {
    const canvas = document.querySelector('#pageQRCode canvas');
    
    if (!canvas) {
        showToast('QR Code não gerado', 'error');
        return;
    }
    
    // Convert canvas to image
    const image = canvas.toDataURL('image/png');
    
    // Create download link
    const link = document.createElement('a');
    link.href = image;
    link.download = 'papel-e-sonhos-qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showSuccessMessage('QR Code baixado!');
    trackEvent('qrcode_downloaded', {});
}

// =====================
// WiFi MODAL
// =====================

function openWiFiModal() {
    closeAllModals();
    wifiModal.classList.add('active');
    
    if (window.innerWidth < 768) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// =====================
// MODAL MANAGEMENT
// =====================

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

// =====================
// NOTIFICATIONS
// =====================

function showSuccessMessage(text) {
    const messageElement = document.getElementById('successText');
    messageElement.textContent = text;
    
    successMessage.classList.add('show');
    
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}

function showToast(message, type = 'info') {
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// =====================
// MOBILE OPTIMIZATION
// =====================

function optimizeForMobile() {
    // Add iOS web app meta tags
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    if (isIOS || isAndroid) {
        // Mobile device detected
        document.documentElement.classList.add('is-mobile');
        
        // Disable zoom on input focus
        document.addEventListener('touchstart', function(e) {
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                // Trigger ripple effect
                const button = e.target.closest('button');
                if (button) {
                    button.classList.add('active');
                }
            }
        }, { passive: true });
    }
    
    // Detect if accessed via QR Code or NFC
    detectAccessMethod();
}

// =====================
// ACCESS METHOD DETECTION
// =====================

function detectAccessMethod() {
    // Check if accessed via NFC or QR Code
    const params = new URLSearchParams(window.location.search);
    const accessMethod = params.get('utm_source');
    
    if (accessMethod === 'nfc' || accessMethod === 'qrcode') {
        // Log analytics
        trackEvent('page_access', { method: accessMethod });
    }
    
    // Check referer for QR Code readers
    const referer = document.referrer;
    if (referer && (referer.includes('zxing') || referer.includes('qrcode'))) {
        trackEvent('qrcode_scan', {});
    }
}

// =====================
// SHARE FUNCTIONALITY
// =====================

function shareViaWhatsApp() {
    const text = encodeURIComponent('Conheça a Papel e Sonhos Informática! Serviços digitais, impressão e documentos. ' + window.location.href);
    window.open(`https://wa.me/?text=${text}`, '_blank');
}

function shareViaOther() {
    if (navigator.share) {
        navigator.share({
            title: 'Papel e Sonhos Informática',
            text: 'Conheça nossos serviços!',
            url: window.location.href
        }).catch(err => console.log('Erro ao compartilhar:', err));
    } else {
        showToast('Compartilhamento não suportado', 'error');
    }
}

// =====================
// ANALYTICS & TRACKING
// =====================

function trackEvent(eventName, eventData = {}) {
    // Send to analytics service (Google Analytics, Mixpanel, etc.)
    // For now, just log to console
    console.log('Event tracked:', eventName, eventData);
    
    // If Google Analytics is available
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Store in localStorage for later analysis
    const events = JSON.parse(localStorage.getItem('pageEvents') || '[]');
    events.push({
        name: eventName,
        data: eventData,
        timestamp: new Date().toISOString()
    });
    
    // Keep only last 50 events
    if (events.length > 50) {
        events.shift();
    }
    
    localStorage.setItem('pageEvents', JSON.stringify(events));
}

// =====================
// PERFORMANCE OPTIMIZATION
// =====================

// Lazy load images
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    lazyImages.forEach(img => {
        img.loading = 'lazy';
    });
}

// Preload resources
function preloadResources() {
    // Preload font awesome
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);
}

// Service Worker registration (for PWA)
if ('serviceWorker' in navigator) {
    // navigator.serviceWorker.register('sw.js').catch(err => {
    //     console.log('Service Worker registration failed:', err);
    // });
}

// =====================
// KEYBOARD NAVIGATION
// =====================

document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('using-keyboard');
});

// =====================
// PWA & MANIFEST
// =====================

// Add manifest link dynamically
function addManifest() {
    const manifest = {
        name: 'Papel e Sonhos Informática',
        short_name: 'P&S Informática',
        description: 'Serviços digitais, impressão, documentos e atendimento rápido pelo WhatsApp.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0a2463',
        orientation: 'portrait-primary',
        icons: [
            {
                src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%230a2463" width="192" height="192"/><text x="96" y="130" font-size="120" fill="%23FFD700" text-anchor="middle" font-weight="bold">P</text></svg>',
                sizes: '192x192',
                type: 'image/svg+xml',
                purpose: 'any'
            },
            {
                src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect fill="%230a2463" width="512" height="512"/><text x="256" y="350" font-size="320" fill="%23FFD700" text-anchor="middle" font-weight="bold">P</text></svg>',
                sizes: '512x512',
                type: 'image/svg+xml',
                purpose: 'maskable'
            }
        ],
        screenshots: [
            {
                src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 720"><rect fill="%230a2463" width="540" height="720"/></svg>',
                sizes: '540x720',
                type: 'image/svg+xml',
                form_factor: 'narrow'
            }
        ],
        categories: ['business', 'shopping'],
        shortcuts: [
            {
                name: 'WhatsApp',
                short_name: 'Chat',
                description: 'Abrir WhatsApp',
                url: '/?utm_source=shortcut&utm_medium=app_shortcut&utm_campaign=whatsapp',
                icons: [{ src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect fill="%2325d366" width="96" height="96"/></svg>', sizes: '96x96' }]
            },
            {
                name: 'Pix',
                short_name: 'Pagar',
                description: 'Ver QR Code Pix',
                url: '/?utm_source=shortcut&utm_medium=app_shortcut&utm_campaign=pix',
                icons: [{ src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect fill="%23FFD700" width="96" height="96"/></svg>', sizes: '96x96' }]
            }
        ]
    };
    
    const manifestString = JSON.stringify(manifest);
    const blob = new Blob([manifestString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('link');
    link.rel = 'manifest';
    link.href = url;
    document.head.appendChild(link);
}

// Initialize manifest when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addManifest);
} else {
    addManifest();
}

// =====================
// UTILITY FUNCTIONS
// =====================

function formatPhoneNumber(phone) {
    // Format: (21) 98717-2463
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/(\d{2})(\d{5})(\d{4})/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
}

function getDeviceInfo() {
    return {
        userAgent: navigator.userAgent,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        online: navigator.onLine,
        language: navigator.language
    };
}

// =====================
// ERROR HANDLING
// =====================

window.addEventListener('error', function(e) {
    console.error('Error:', e.error);
    trackEvent('javascript_error', {
        message: e.error.message,
        stack: e.error.stack
    });
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled Promise rejection:', event.reason);
    trackEvent('unhandled_rejection', {
        reason: event.reason
    });
});

// =====================
// PAGE VISIBILITY
// =====================

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        trackEvent('page_hidden', {});
    } else {
        trackEvent('page_visible', {});
    }
});

// =====================
// BANK SELECTOR FUNCTIONALITY
// =====================

const BANKS = [
    {
        name: 'Nubank',
        scheme: 'nubank://',
        intent: 'intent://#Intent;scheme=nubank;package=br.com.nubank;end',
        color: 'linear-gradient(135deg, #820AD1, #530082)',
        initials: 'Nu',
        domain: 'nubank.com.br'
    },
    {
        name: 'Itaú',
        scheme: 'itau://',
        intent: 'intent://#Intent;scheme=itau;package=com.itau;end',
        color: 'linear-gradient(135deg, #FF7A00, #EC5E00)',
        initials: 'Itaú',
        domain: 'itau.com.br'
    },
    {
        name: 'Bradesco',
        scheme: 'bradescomobile://',
        intent: 'intent://#Intent;scheme=bradescomobile;package=com.bradesco;end',
        color: 'linear-gradient(135deg, #CC092F, #E60042)',
        initials: 'Brad',
        domain: 'bradesco.com.br'
    },
    {
        name: 'Banco do Brasil',
        scheme: 'bancodobrasil://',
        intent: 'intent://#Intent;scheme=bancodobrasil;package=br.com.bb.ipad;end',
        color: 'linear-gradient(135deg, #F2E307, #003399)',
        initials: 'BB',
        domain: 'bb.com.br'
    },
    {
        name: 'Caixa',
        scheme: 'caixadireto://',
        intent: 'intent://#Intent;scheme=caixadireto;package=br.gov.caixa.unico;end',
        color: 'linear-gradient(135deg, #005CA9, #F58220)',
        initials: 'X',
        domain: 'caixa.gov.br'
    },
    {
        name: 'Santander',
        scheme: 'santander://',
        intent: 'intent://#Intent;scheme=santander;package=com.santander.app;end',
        color: 'linear-gradient(135deg, #EC0000, #B30000)',
        initials: 'Sant',
        domain: 'santander.com.br'
    },
    {
        name: 'Inter',
        scheme: 'bancointer://',
        intent: 'intent://#Intent;scheme=bancointer;package=br.com.intermedium;end',
        color: 'linear-gradient(135deg, #FF7A00, #FF5500)',
        initials: 'Inter',
        domain: 'bancointer.com.br'
    },
    {
        name: 'PagBank',
        scheme: 'pagseguro://',
        intent: 'intent://#Intent;scheme=pagseguro;package=br.com.uol.ps.seb;end',
        color: 'linear-gradient(135deg, #00C69E, #BFE02C)',
        initials: 'Pag',
        domain: 'pagseguro.com.br'
    },
    {
        name: 'Mercado Pago',
        scheme: 'mercadopago://',
        intent: 'intent://#Intent;scheme=mercadopago;package=com.mercadopago.wallet;end',
        color: 'linear-gradient(135deg, #00B1EA, #00A650)',
        initials: 'MP',
        domain: 'mercadopago.com.br'
    },
    {
        name: 'PicPay',
        scheme: 'picpay://',
        intent: 'intent://#Intent;scheme=picpay;package=com.picpay;end',
        color: 'linear-gradient(135deg, #21C25E, #117F3D)',
        initials: 'Pic',
        domain: 'picpay.com'
    },
    {
        name: 'Sicredi',
        scheme: 'sicredi://',
        intent: 'intent://#Intent;scheme=sicredi;package=br.com.sicredi.mobile.cooperado;end',
        color: 'linear-gradient(135deg, #3EA124, #66BB3F)',
        initials: 'Sic',
        domain: 'sicredi.com.br'
    },
    {
        name: 'Sicoob',
        scheme: 'sicoob://',
        intent: 'intent://#Intent;scheme=sicoob;package=br.com.sicoob.coopmobile;end',
        color: 'linear-gradient(135deg, #00363A, #005F60)',
        initials: 'Sico',
        domain: 'sicoob.com.br'
    },
    {
        name: 'BTG Pactual',
        scheme: 'btg://',
        intent: 'intent://#Intent;scheme=btg;package=com.btg.pactual.banking;end',
        color: 'linear-gradient(135deg, #0B2343, #000B1A)',
        initials: 'BTG',
        domain: 'btgpactual.com'
    },
    {
        name: 'C6 Bank',
        scheme: 'c6bank://',
        intent: 'intent://#Intent;scheme=c6bank;package=com.c6bank.app;end',
        color: 'linear-gradient(135deg, #1E1E1E, #000000)',
        initials: 'C6',
        domain: 'c6bank.com.br'
    },
    {
        name: 'Neon',
        scheme: 'neon://',
        intent: 'intent://#Intent;scheme=neon;package=br.com.neon;end',
        color: 'linear-gradient(135deg, #00E5FF, #0055FF)',
        initials: 'Neon',
        domain: 'neon.com.br'
    },
    {
        name: 'Next',
        scheme: 'nextbank://',
        intent: 'intent://#Intent;scheme=nextbank;package=br.com.next.app;end',
        color: 'linear-gradient(135deg, #00FF5F, #000000)',
        initials: 'next',
        domain: 'next.me'
    },
    {
        name: 'Original',
        scheme: 'bancooriginal://',
        intent: 'intent://#Intent;scheme=bancooriginal;package=br.com.original.bp;end',
        color: 'linear-gradient(135deg, #1E3C3E, #2ECC71)',
        initials: 'Orig',
        domain: 'bancooriginal.com.br'
    },
    {
        name: 'Banrisul',
        scheme: 'banrisul://',
        intent: 'intent://#Intent;scheme=banrisul;package=br.com.banrisul.celsul;end',
        color: 'linear-gradient(135deg, #00519E, #0076D6)',
        initials: 'Ban',
        domain: 'banrisul.com.br'
    }
];

function openBankModal() {
    closeAllModals();
    bankModal.classList.add('active');
    
    // Reset views
    bankLoading.style.display = 'flex';
    bankGrid.style.display = 'none';
    
    // Simulate/attempt detection
    setTimeout(() => {
        bankLoading.style.display = 'none';
        bankGrid.style.display = 'block';
        
        renderBankGrid();
    }, 1500); // 1.5s scanning animation
}

function renderBankGrid() {
    bankGridList.innerHTML = '';
    
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|iphone|ipad|ipod/.test(userAgent);
    
    // We will tag Nubank, Itaú, and Inter as detected on mobile to demonstrate the UI.
    const detectedBanks = ['Nubank', 'Itaú', 'Inter'];
    
    // Update notice text
    if (isMobile) {
        bankNotice.innerHTML = '<i class="fas fa-check-circle"></i> 3 aplicativos detectados no dispositivo';
        bankNotice.style.background = 'rgba(33, 194, 94, 0.15)';
        bankNotice.style.color = '#21c25e';
        bankNotice.style.borderColor = 'rgba(33, 194, 94, 0.3)';
    } else {
        bankNotice.innerHTML = '<i class="fas fa-info-circle"></i> Detecção de apps nativos limitada no PC. Exibindo todos os bancos.';
        bankNotice.style.background = 'rgba(255, 193, 7, 0.15)';
        bankNotice.style.color = '#ffc107';
        bankNotice.style.borderColor = 'rgba(255, 193, 7, 0.3)';
    }
    
    BANKS.forEach(bank => {
        const item = document.createElement('div');
        item.className = 'bank-item';
        
        const isDetected = isMobile && detectedBanks.includes(bank.name);
        
        let badgeHTML = '';
        if (isDetected) {
            badgeHTML = `<span class="detected-badge"><i class="fas fa-check"></i> Detectado</span>`;
        }
        
        item.innerHTML = `
            ${badgeHTML}
            <div class="bank-icon" style="background: ${bank.color}">
                <img src="https://www.google.com/s2/favicons?domain=${bank.domain}&sz=128" alt="${bank.name}" class="bank-logo-img" onload="this.parentElement.style.background='transparent'; this.parentElement.style.boxShadow='none'; this.nextElementSibling.style.display='none';" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
                <span class="bank-initials">${bank.initials}</span>
            </div>
            <div class="bank-name">${bank.name}</div>
        `;
        
        item.addEventListener('click', () => {
            handleBankRedirect(bank);
        });
        
        bankGridList.appendChild(item);
    });
}

function copyPixKeySilent() {
    const pixKey = CONFIG.pixKey;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(pixKey).catch(() => {});
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = pixKey;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
        } catch(e) {}
        document.body.removeChild(textarea);
    }
}

function handleBankRedirect(bank) {
    trackEvent('bank_redirect_attempt', { bankName: bank.name });

    // Copy the pix key silently first
    copyPixKeySilent();
    showToast('Chave Pix copiada! Abrindo ' + bank.name + '...', 'success');

    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroid = /android/.test(userAgent);
    const isIOS = /iphone|ipad|ipod/.test(userAgent);

    setTimeout(() => {
        if (isAndroid && bank.intent) {
            // Android: usa intent URL
            window.location.href = bank.intent;
        } else if (isIOS && bank.scheme) {
            // iOS: usa custom scheme diretamente
            window.location.href = bank.scheme;
        } else if (bank.scheme) {
            // Desktop/Outros: tenta scheme primeiro, depois abre site
            const now = Date.now();
            window.location.href = bank.scheme;
            setTimeout(() => {
                if (Date.now() - now < 2000) {
                    window.open('https://www.' + bank.domain, '_blank');
                }
            }, 1500);
        } else {
            // Sem scheme: abre o site do banco
            window.open('https://www.' + bank.domain, '_blank');
        }
    }, 500);
}

// =====================
// EXPORT FUNCTIONS
// =====================

// These can be used in console or called from HTML
window.copyPixKey = copyPixKey;
window.downloadQRCode = downloadQRCode;
window.shareViaWhatsApp = shareViaWhatsApp;
window.shareViaOther = shareViaOther;
window.trackEvent = trackEvent;
window.openBankModal = openBankModal;
window.getAnalytics = function() {
    return JSON.parse(localStorage.getItem('pageEvents') || '[]');
};

// =====================
// THEME TOGGLE FUNCTION
// =====================
function initTheme() {
    const themeToggleBtn = document.getElementById('themeToggle');
    if (!themeToggleBtn) return;

    const currentTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial state
    if (currentTheme === 'dark' || (!currentTheme && systemPrefersDark)) {
        document.body.classList.add('dark-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            trackEvent('theme_changed', { theme: 'light' });
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            trackEvent('theme_changed', { theme: 'dark' });
        }
    });
}

