# 🎨 Exemplos de Customização Avançada

## 1. Adicionar Novo Botão Customizado

### Exemplo: Botão de Link Rápido para Serviço

**No `index.html`:**

```html
<!-- Adicione este botão ao lado dos outros -->
<button class="link-button servicos-btn" data-action="open-link" 
        data-link="https://seu-site.com/servicos">
    <div class="button-icon">
        <i class="fas fa-briefcase"></i>
    </div>
    <div class="button-content">
        <h3>Nossos Serviços</h3>
        <p>Conheça nossas soluções</p>
    </div>
</button>
```

**No `style.css`:**

```css
.servicos-btn .button-icon {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: var(--white);
}

.servicos-btn:hover {
    border-color: #6366f1;
}
```

---

## 2. Mudar Tema de Cores

### Tema Dark Premium

**No `style.css`**, substitua as variáveis:

```css
:root {
    --primary-dark: #1a1a2e;      /* Azul muito escuro */
    --primary-light: #16213e;     /* Azul escuro */
    --accent-yellow: #00d4ff;     /* Ciano brilhante */
    --white: #e0e0e0;
    --gray-light: #2a2a3e;
    --gray-medium: #3d3d4d;
    --gray-dark: #ffffff;
}
```

### Tema Verde (Saúde/Meio Ambiente)

```css
:root {
    --primary-dark: #1b5e20;      /* Verde escuro */
    --primary-light: #388e3c;     /* Verde */
    --accent-yellow: #4caf50;     /* Verde claro */
    --white: #ffffff;
    --gray-light: #f1f8f4;
    --gray-medium: #e8f5e9;
    --gray-dark: #212121;
}
```

### Tema Roxo (Premium/Luxo)

```css
:root {
    --primary-dark: #4a148c;      /* Roxo escuro */
    --primary-light: #7b1fa2;     /* Roxo */
    --accent-yellow: #e1bee7;     /* Roxo claro */
    --white: #ffffff;
    --gray-light: #f3e5f5;
    --gray-medium: #e0bee7;
    --gray-dark: #37474f;
}
```

---

## 3. Animações Customizadas

### Adicionar Animação de Entrada aos Botões

**No `style.css`:**

```css
@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.link-button {
    animation: slideInLeft 0.6s ease-out forwards;
}

/* Delay progressivo */
.link-button:nth-child(1) { animation-delay: 0.1s; }
.link-button:nth-child(2) { animation-delay: 0.2s; }
.link-button:nth-child(3) { animation-delay: 0.3s; }
.link-button:nth-child(4) { animation-delay: 0.4s; }
.link-button:nth-child(5) { animation-delay: 0.5s; }
.link-button:nth-child(6) { animation-delay: 0.6s; }
```

### Efeito Glow (Brilho)

```css
.link-button {
    position: relative;
    overflow: visible;
}

.link-button::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, rgba(255,215,0,0.2), transparent);
    opacity: 0;
    transition: opacity 0.3s;
    border-radius: 12px;
    pointer-events: none;
}

.link-button:hover::after {
    opacity: 1;
}
```

---

## 4. Modal Customizado (Exemplo: Contato)

### Adicionar Modal de Contato

**No `index.html`, adicione:**

```html
<!-- Modal de Contato -->
<div class="modal" id="contatoModal">
    <div class="modal-content">
        <button class="modal-close">&times;</button>
        <h2>Envie uma Mensagem</h2>
        
        <form id="contatoForm">
            <div class="form-group">
                <input type="text" placeholder="Seu Nome" required>
            </div>
            <div class="form-group">
                <input type="email" placeholder="Seu Email" required>
            </div>
            <div class="form-group">
                <textarea placeholder="Sua Mensagem" rows="4" required></textarea>
            </div>
            <button type="submit" class="action-btn">Enviar Mensagem</button>
        </form>
    </div>
</div>
```

**No `style.css`, adicione:**

```css
.form-group {
    margin-bottom: 15px;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 12px;
    border: 2px solid var(--gray-medium);
    border-radius: 8px;
    font-family: inherit;
    font-size: 14px;
    transition: var(--transition);
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--primary-dark);
    box-shadow: 0 0 0 3px rgba(10, 36, 99, 0.1);
}
```

**No `script.js`, adicione:**

```javascript
const contatoForm = document.getElementById('contatoForm');

if (contatoForm) {
    contatoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aqui você pode enviar para um servidor
        // ou usar um serviço como Formspree, Basin, etc
        
        showSuccessMessage('Mensagem enviada com sucesso!');
        contatoForm.reset();
        closeAllModals();
    });
}
```

---

## 5. Integração com Formspree (Receber Emails)

**No `index.html`, troque o form:**

```html
<form action="https://formspree.io/f/SEU_ID_AQUI" method="POST">
    <div class="form-group">
        <input type="text" name="nome" placeholder="Seu Nome" required>
    </div>
    <div class="form-group">
        <input type="email" name="email" placeholder="Seu Email" required>
    </div>
    <div class="form-group">
        <textarea name="mensagem" placeholder="Sua Mensagem" rows="4" required></textarea>
    </div>
    <button type="submit" class="action-btn">Enviar Mensagem</button>
</form>
```

**Como configurar:**
1. Acesse https://formspree.io
2. Crie uma conta
3. Crie um novo formulário
4. Copie o ID e substitua em `f/SEU_ID_AQUI`
5. Pronto! Seus emails serão recebidos

---

## 6. Adicionar Carrossel de Depoimentos

**No `index.html`:**

```html
<section class="testimonials-section">
    <h2>O Que Nossos Clientes Dizem</h2>
    
    <div class="testimonials-carousel">
        <div class="testimonial-card">
            <p>"Excelente atendimento e qualidade nas impressões!"</p>
            <p class="author">- João Silva</p>
        </div>
        <div class="testimonial-card">
            <p>"Rápido, eficiente e com preços muito justos."</p>
            <p class="author">- Maria Santos</p>
        </div>
        <div class="testimonial-card">
            <p>"Resolveu meu problema em segundos via WhatsApp!"</p>
            <p class="author">- Pedro Costa</p>
        </div>
    </div>
</section>
```

**No `style.css`:**

```css
.testimonials-section {
    padding: 30px;
    background: linear-gradient(to bottom, rgba(10, 36, 99, 0.05), transparent);
}

.testimonials-section h2 {
    text-align: center;
    color: var(--primary-dark);
    margin-bottom: 20px;
    font-size: 20px;
}

.testimonials-carousel {
    display: flex;
    gap: 15px;
    overflow-x: auto;
    padding: 10px 0;
    scroll-behavior: smooth;
}

.testimonial-card {
    flex: 0 0 85%;
    background: var(--white);
    padding: 20px;
    border-radius: 12px;
    border-left: 4px solid var(--accent-yellow);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.testimonial-card p {
    font-size: 14px;
    color: var(--gray-dark);
    margin-bottom: 10px;
}

.testimonial-card .author {
    font-weight: 600;
    color: var(--primary-dark);
    font-size: 12px;
}
```

---

## 7. Modo Offline (Service Worker)

**Crie arquivo `sw.js`:**

```javascript
const CACHE_NAME = 'papel-sonhos-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
```

**No `script.js`, descomente:**

```javascript
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(err => {
        console.log('Service Worker registration failed:', err);
    });
}
```

---

## 8. Adicionar Contador de Visitas

**No `script.js`:**

```javascript
function initVisitCounter() {
    let visits = localStorage.getItem('papelSonhosVisits') || 0;
    visits = parseInt(visits) + 1;
    localStorage.setItem('papelSonhosVisits', visits);
    
    console.log(`Visitas: ${visits}`);
    
    return visits;
}

// Chamar ao carregar
const totalVisits = initVisitCounter();

// Rastrear evento
trackEvent('page_loaded', { total_visits: totalVisits });
```

---

## 9. Dark Mode Toggle

**No `index.html`, adicione button:**

```html
<button class="theme-toggle" id="themeToggle">
    <i class="fas fa-moon"></i>
</button>
```

**No `style.css`:**

```css
.theme-toggle {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: var(--accent-yellow);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-dark);
    z-index: 999;
    transition: var(--transition);
    box-shadow: var(--shadow);
}

.theme-toggle:hover {
    transform: scale(1.1) rotate(20deg);
}
```

**No `script.js`:**

```javascript
const themeToggle = document.getElementById('themeToggle');

themeToggle?.addEventListener('click', function() {
    document.documentElement.classList.toggle('dark-mode');
    localStorage.setItem('theme', 
        document.documentElement.classList.contains('dark-mode') ? 'dark' : 'light'
    );
    
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Carregar tema salvo
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark-mode');
}
```

---

## 10. Integração com WhatsApp Web (Chat direto)

**Adicione ao `script.js`:**

```javascript
function openWhatsAppChat(message) {
    const number = CONFIG.whatsappPhone;
    const text = encodeURIComponent(message);
    const url = `https://wa.me/${number}?text=${text}`;
    window.open(url, '_blank');
}

// Usar em botões
window.openWhatsAppChat = openWhatsAppChat;
```

**No HTML:**

```html
<button onclick="openWhatsAppChat('Olá! Gostaria de mais informações.')">
    Chat no WhatsApp
</button>
```

---

Divirta-se customizando! 🎉
