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
const connectWifiBtn = document.getElementById('connectWifiBtn');
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

    // Connect WiFi button
    if (connectWifiBtn) {
        connectWifiBtn.addEventListener('click', openWifiSettings);
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
    link.download = 'canto-do-curio-qrcode.png';
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

// Abre as configurações de Wi-Fi do dispositivo
function openWifiSettings() {
    const ua = navigator.userAgent.toLowerCase();
    const isAndroid = /android/.test(ua);
    const isIOS = /iphone|ipad|ipod/.test(ua);

    // Copia a senha automaticamente antes de redirecionar
    copyWifiPassword();

    trackEvent('wifi_connect_clicked', {});

    if (isAndroid) {
        // Android: abre as configurações de Wi-Fi diretamente via Intent
        // Pacote: com.android.settings (Settings principal)
        // Ação: android.settings.WIFI_SETTINGS abre a tela de Wi-Fi
        window.location.href = 'intent://wifi#Intent;action=android.settings.WIFI_SETTINGS;end';
    } else if (isIOS) {
        // iOS: não existe deep link direto para Wi-Fi Settings
        // Abre os Ajustes gerais do app (melhor alternativa disponível)
        // Informa ao usuário para selecionar Wi-Fi manualmente
        showToast('Abrindo Ajustes... Selecione "Wi-Fi" na lista.', 'info');
        window.location.href = 'app-settings:';
    } else {
        // Desktop: informa que o recurso é mobile
        showToast('A configuração de Wi-Fi está disponível apenas em dispositivos móveis.', 'info');
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
    const text = encodeURIComponent('Conheça a Canto do Curió Rações! Rações e acessórios para pets. ' + window.location.href);
    window.open(`https://wa.me/?text=${text}`, '_blank');
}

function shareViaOther() {
    if (navigator.share) {
        navigator.share({
            title: 'Canto do Curió Rações',
            text: 'Conheça nossos produtos para pets!',
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
        intent: 'intent://open#Intent;scheme=nubank;package=com.nu.production;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.nu.production;end',
        playStore: 'https://play.google.com/store/apps/details?id=com.nu.production',
        appStore: 'https://apps.apple.com/app/nubank/id1093127969',
        color: 'linear-gradient(135deg, #820AD1, #530082)',
        initials: 'Nu',
        domain: 'nubank.com.br'
    },
    {
        name: 'Itaú',
        scheme: 'itau://',
        intent: 'intent://open#Intent;scheme=itau;package=com.itau;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.itau;end',
        playStore: 'https://play.google.com/store/apps/details?id=com.itau',
        appStore: 'https://apps.apple.com/app/itau-personal/id577039602',
        color: 'linear-gradient(135deg, #FF7A00, #EC5E00)',
        initials: 'Itaú',
        domain: 'itau.com.br'
    },
    {
        name: 'Bradesco',
        scheme: 'bradesco://',
        intent: 'intent://open#Intent;scheme=bradesco;package=com.bradesco;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.bradesco;end',
        playStore: 'https://play.google.com/store/apps/details?id=com.bradesco',
        appStore: 'https://apps.apple.com/app/bradesco/id491002437',
        color: 'linear-gradient(135deg, #CC092F, #E60042)',
        initials: 'Brad',
        domain: 'bradesco.com.br'
    },
    {
        name: 'Banco do Brasil',
        scheme: 'bb://',
        intent: 'intent://open#Intent;scheme=bb;package=br.com.bb.android;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dbr.com.bb.android;end',
        playStore: 'https://play.google.com/store/apps/details?id=br.com.bb.android',
        appStore: 'https://apps.apple.com/app/banco-do-brasil/id495409822',
        color: 'linear-gradient(135deg, #F2E307, #003399)',
        initials: 'BB',
        domain: 'bb.com.br'
    },
    {
        name: 'Caixa',
        scheme: 'caixa://',
        intent: 'intent://open#Intent;scheme=caixa;package=br.com.gabba.Caixa;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dbr.com.gabba.Caixa;end',
        playStore: 'https://play.google.com/store/apps/details?id=br.com.gabba.Caixa',
        appStore: 'https://apps.apple.com/app/caixa/id481950320',
        color: 'linear-gradient(135deg, #005CA9, #F58220)',
        initials: 'CX',
        domain: 'caixa.gov.br'
    },
    {
        name: 'Santander',
        scheme: 'santander://',
        intent: 'intent://open#Intent;scheme=santander;package=com.santander.app;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.santander.app;end',
        playStore: 'https://play.google.com/store/apps/details?id=com.santander.app',
        appStore: 'https://apps.apple.com/app/santander/id462668768',
        color: 'linear-gradient(135deg, #EC0000, #B30000)',
        initials: 'San',
        domain: 'santander.com.br'
    },
    {
        name: 'Inter',
        scheme: 'bancointer://',
        intent: 'intent://open#Intent;scheme=bancointer;package=br.com.intermedium;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dbr.com.intermedium;end',
        playStore: 'https://play.google.com/store/apps/details?id=br.com.intermedium',
        appStore: 'https://apps.apple.com/app/inter/id894478706',
        color: 'linear-gradient(135deg, #FF7A00, #FF5500)',
        initials: 'Inter',
        domain: 'bancointer.com.br'
    },
    {
        name: 'PagBank',
        scheme: 'pagseguro://',
        intent: 'intent://open#Intent;scheme=pagseguro;package=br.com.pagseguro.app;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dbr.com.pagseguro.app;end',
        playStore: 'https://play.google.com/store/apps/details?id=br.com.pagseguro.app',
        appStore: 'https://apps.apple.com/app/pagbank/id850697945',
        color: 'linear-gradient(135deg, #00C69E, #BFE02C)',
        initials: 'Pag',
        domain: 'pagseguro.com.br'
    },
    {
        name: 'Mercado Pago',
        scheme: 'mercadopago://',
        intent: 'intent://open#Intent;scheme=mercadopago;package=com.mercadopago.wallet;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.mercadopago.wallet;end',
        playStore: 'https://play.google.com/store/apps/details?id=com.mercadopago.wallet',
        appStore: 'https://apps.apple.com/app/mercado-pago/id931241885',
        color: 'linear-gradient(135deg, #00B1EA, #00A650)',
        initials: 'MP',
        domain: 'mercadopago.com.br'
    },
    {
        name: 'PicPay',
        scheme: 'picpay://',
        intent: 'intent://open#Intent;scheme=picpay;package=com.picpay;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.picpay;end',
        playStore: 'https://play.google.com/store/apps/details?id=com.picpay',
        appStore: 'https://apps.apple.com/app/picpay/id822207724',
        color: 'linear-gradient(135deg, #21C25E, #117F3D)',
        initials: 'Pic',
        domain: 'picpay.com'
    },
    {
        name: 'Sicredi',
        scheme: 'sicredi://',
        intent: 'intent://open#Intent;scheme=sicredi;package=br.com.sicredi.mobile.cooperado;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dbr.com.sicredi.mobile.cooperado;end',
        playStore: 'https://play.google.com/store/apps/details?id=br.com.sicredi.mobile.cooperado',
        appStore: 'https://apps.apple.com/app/sicredi/id493129390',
        color: 'linear-gradient(135deg, #3EA124, #66BB3F)',
        initials: 'Sic',
        domain: 'sicredi.com.br'
    },
    {
        name: 'Sicoob',
        scheme: 'sicoob://',
        intent: 'intent://open#Intent;scheme=sicoob;package=br.com.sicoob.coopmobile;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dbr.com.sicoob.coopmobile;end',
        playStore: 'https://play.google.com/store/apps/details?id=br.com.sicoob.coopmobile',
        appStore: 'https://apps.apple.com/app/sicoob/id1102344425',
        color: 'linear-gradient(135deg, #00363A, #005F60)',
        initials: 'Sic',
        domain: 'sicoob.com.br'
    },
    {
        name: 'BTG Pactual',
        scheme: 'btg://',
        intent: 'intent://open#Intent;scheme=btg;package=com.btg.pactual.banking;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.btg.pactual.banking;end',
        playStore: 'https://play.google.com/store/apps/details?id=com.btg.pactual.banking',
        appStore: 'https://apps.apple.com/app/btg-pactual/id999475586',
        color: 'linear-gradient(135deg, #0B2343, #000B1A)',
        initials: 'BTG',
        domain: 'btgpactual.com'
    },
    {
        name: 'C6 Bank',
        scheme: 'c6bank://',
        intent: 'intent://open#Intent;scheme=c6bank;package=com.c6bank.app;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.c6bank.app;end',
        playStore: 'https://play.google.com/store/apps/details?id=com.c6bank.app',
        appStore: 'https://apps.apple.com/app/c6-bank/id1448835276',
        color: 'linear-gradient(135deg, #1E1E1E, #000000)',
        initials: 'C6',
        domain: 'c6bank.com.br'
    },
    {
        name: 'Neon',
        scheme: 'neon://',
        intent: 'intent://open#Intent;scheme=neon;package=br.com.neon;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dbr.com.neon;end',
        playStore: 'https://play.google.com/store/apps/details?id=br.com.neon',
        appStore: 'https://apps.apple.com/app/neon-cart%C3%A3o/id1163016100',
        color: 'linear-gradient(135deg, #00E5FF, #0055FF)',
        initials: 'Neon',
        domain: 'neon.com.br'
    },
    {
        name: 'Original',
        scheme: 'bancooriginal://',
        intent: 'intent://open#Intent;scheme=bancooriginal;package=br.com.original.bp;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dbr.com.original.bp;end',
        playStore: 'https://play.google.com/store/apps/details?id=br.com.original.bp',
        appStore: 'https://apps.apple.com/app/banco-original/id1159371498',
        color: 'linear-gradient(135deg, #1E3C3E, #2ECC71)',
        initials: 'Orig',
        domain: 'bancooriginal.com.br'
    },
    {
        name: 'Banrisul',
        scheme: 'banrisul://',
        intent: 'intent://open#Intent;scheme=banrisul;package=br.com.banrisul.celsul;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dbr.com.banrisul.celsul;end',
        playStore: 'https://play.google.com/store/apps/details?id=br.com.banrisul.celsul',
        appStore: 'https://apps.apple.com/app/banrisul/id490488591',
        color: 'linear-gradient(135deg, #00519E, #0076D6)',
        initials: 'Ban',
        domain: 'banrisul.com.br'
    }
];

// Detecta o ambiente de execução
function detectPlatform() {
    const ua = navigator.userAgent.toLowerCase();
    const isAndroid = /android/.test(ua);
    const isIOS = /iphone|ipad|ipod/.test(ua);
    const isMobile = isAndroid || isIOS;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    const isTWA = document.referrer.includes('android-app://');

    return { isAndroid, isIOS, isMobile, isStandalone, isTWA };
}

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
    }, 1500);
}

function renderBankGrid() {
    bankGridList.innerHTML = '';
    const platform = detectPlatform();

    // Atualiza aviso conforme plataforma
    if (platform.isMobile) {
        bankNotice.innerHTML = '<i class="fas fa-info-circle"></i> Toque em um banco para abrir o app. A chave Pix será copiada automaticamente.';
        bankNotice.style.background = 'rgba(33, 194, 94, 0.15)';
        bankNotice.style.color = '#21c25e';
        bankNotice.style.borderColor = 'rgba(33, 194, 94, 0.3)';
    } else {
        bankNotice.innerHTML = '<i class="fas fa-info-circle"></i> No celular, o app abre direto. Aqui você será redirecionado ao site do banco.';
        bankNotice.style.background = 'rgba(255, 193, 7, 0.15)';
        bankNotice.style.color = '#ffc107';
        bankNotice.style.borderColor = 'rgba(255, 193, 7, 0.3)';
    }

    BANKS.forEach(bank => {
        const item = document.createElement('div');
        item.className = 'bank-item';

        item.innerHTML = `
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

// Copia a chave Pix silenciosamente
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
        try { document.execCommand('copy'); } catch(e) {}
        document.body.removeChild(textarea);
    }
}

// Abre o app bancário com fallback robusto
function handleBankRedirect(bank) {
    trackEvent('bank_redirect_attempt', { bankName: bank.name });

    const platform = detectPlatform();

    // Copia a chave Pix
    copyPixKeySilent();
    showToast('Chave Pix copiada! Abrindo ' + bank.name + '...', 'success');

    // Fecha o modal
    setTimeout(() => {
        closeAllModals();
    }, 300);

    // ── ANDROID: Usa Intent URL com fallback ──
    if (platform.isAndroid) {
        // Cria um link <a> e dispara o click (mais compatível que window.location)
        const a = document.createElement('a');
        a.href = bank.intent;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return;
    }

    // ── iOS: Usa custom scheme via <a> click ──
    if (platform.isIOS) {
        const a = document.createElement('a');
        a.href = bank.scheme;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return;
    }

    // ── DESKTOP: Tenta scheme, senão abre loja/site ──
    // No desktop, tentamos window.open com o scheme
    // Se o app não estiver instalado, o browser ignora silenciosamente
    const appProbe = window.open('about:blank', '_blank');
    if (appProbe) {
        appProbe.close();
    }

    // Tenta abrir via scheme
    window.location.href = bank.scheme;

    // Após 2s, se ainda estiver na mesma página, redireciona para loja
    setTimeout(() => {
        // Detecta se o browser continua focado (app não abriu)
        if (document.visibilityState === 'visible') {
            const isMac = /Macintosh|MacIntel/.test(navigator.userAgent) && 'ontouchend' in document;
            if (isMac) {
                // macOS com touch = provavelmente iPad, vai para App Store
                window.location.href = bank.appStore;
            } else {
                window.location.href = bank.playStore;
            }
        }
    }, 2000);
}

// =====================
// EXPORT FUNCTIONS
// =====================

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

    // Sempre inicia em dark mode
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', 'dark');

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

