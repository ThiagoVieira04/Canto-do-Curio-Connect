# 🛠️ Guia de Configuração - Papel e Sonhos Informática

## 1️⃣ CONFIGURAÇÃO RÁPIDA

### Passo 1: Editar Links Personalizados

Abra `script.js` e procure por:

```javascript
const CONFIG = {
    pixKey: '123.456.789-00',           // Sua chave Pix aqui
    whatsappPhone: '5521987172463',     // Seu WhatsApp aqui
    googleReviewUrl: 'https://...',     // Google Business link
    instagramUrl: 'https://instagram.com/seu_usuario',
    facebookUrl: 'https://facebook.com/sua_pagina',
};
```

### Passo 2: Atualizar Dados da Empresa

No `index.html`, procure por:

```html
<!-- ENDEREÇO -->
<p class="contact-badge">
    <i class="fas fa-phone"></i>
    (21) 98717-2463    <!-- Atualize seu telefone -->
</p>

<!-- RODAPÉ -->
<p class="thank-you">Obrigado pela sua visita!</p>
<div class="social-icons">
    <a href="https://www.instagram.com/seu_usuario" ...>
    <a href="https://www.facebook.com/sua_pagina" ...>
</div>
```

### Passo 3: Testar Localmente

```bash
# Abrir no navegador
# Windows: Duplo clique em index.html
# Mac/Linux: Usar um servidor local simples

# Python 3
python -m http.server 8000

# Node.js (com http-server)
npx http-server

# Acessar: http://localhost:8000
```

---

## 2️⃣ GERAÇÃO DE QR CODES

### QR Code do Google Maps

```html
<!-- No botão "Avalie no Google" -->
<a href="https://www.google.com/maps/search/Papel+e+Sonhos+Informática">
```

Para obter o link correto:
1. Procure sua empresa no Google Maps
2. Copie o link da página
3. Coloque em `data-link`

### QR Code do WhatsApp

Link WhatsApp com mensagem pré-pronta:

```
https://wa.me/5521987172463?text=Olá%20Papel%20e%20Sonhos!%20Gostaria%20de%20informações.
```

Personalize:
- `5521987172463` → Seu número com código do país
- `text=` → Sua mensagem (URL encoded)

### QR Code Pix (Avançado)

Para gerar um QR Code Pix funcional:

```javascript
// 1. Gere o payload usando a especificação BACEN
function criarPayloadPix(chave, nomeBeneficiario, valor = null) {
    // Formato: xxxxxx.xxx/XXXXXXXXXXXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXX
    const payload = 
        '00020126360014br.gov.bcb.brcode01051.0.0' +
        '52040000' +  // Merchant Category Code
        '5303986' +   // Currency Code (Real)
        '5406' + valor + // Transaction Amount (opcional)
        '62' + chave +  // End to End ID
        '63041D3C';    // CRC16
    
    return payload;
}
```

**Recomendação**: Use uma biblioteca como:
- [Brazilian QR Code Library](https://github.com/bacen/pix-specs)
- [QR Code Pix Generator Online](https://www.gerarpixqr.com.br/)

---

## 3️⃣ NFC TAGS CONFIGURATION

### Opção 1: Android (TagWriter by NXP)

```
Requisitos:
- Smartphone Android com NFC
- Tag NFC branco (Type 2 ou 4)
- App: TagWriter by NXP (gratuito)

Passos:
1. Abra TagWriter
2. Crie novo record
3. Tipo: "URI"
4. URL: https://seu-dominio.com/?utm_source=nfc
5. Escreva na tag
6. Pronto!
```

### Opção 2: iOS (Shortcut App)

```
Requisitos:
- iPhone 11+ ou iPad (necessário NFC)
- App: Shortcut (pré-instalado)

Passos:
1. Abra a app Shortcut
2. Crie novo atalho
3. Adicione ação "Abrir URL"
4. Cole: https://seu-dominio.com/?utm_source=nfc
5. Salve
6. Na interface NFC, escreva a URL
```

### Opção 3: Online (NFCTools.online)

```
Acesso: https://www.nfctools.org/

1. Clicar em "Write"
2. Tipo: "Well Known Type"
3. Formato: "URI"
4. Cole sua URL
5. Escreva na tag usando seu telefone
```

### URL Recomendada para NFC

```
https://seu-dominio.com/?utm_source=nfc&utm_medium=tag&utm_campaign=papel-e-sonhos
```

Isso permite rastrear:
- Quantas vezes a tag NFC foi acessada
- Em que horário
- De qual dispositivo

---

## 4️⃣ ANALYTICS & TRACKING

### Acompanhar Eventos

No console do navegador (F12), digite:

```javascript
// Ver todos os eventos registrados
getAnalytics()

// Resultado exemplo:
[
  {
    "name": "link_click",
    "data": {"url": "https://wa.me/..."},
    "timestamp": "2024-06-06T10:30:00Z"
  },
  {
    "name": "pix_key_copied",
    "data": {},
    "timestamp": "2024-06-06T10:31:00Z"
  }
]
```

### Google Analytics (Pago)

Adicione ao `index.html` antes de `</head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');  // Seu ID aqui
</script>
```

Onde encontrar ID do GA:
1. Google Analytics → Admin
2. Property → Web Stream
3. Copiar o ID: `G-XXXXXXXXXX`

### Eventos que são rastreados:

- `link_click` - Botão clicado
- `pix_key_copied` - Chave Pix copiada
- `qrcode_downloaded` - QR Code baixado
- `qrcode_scan` - Acesso via QR Code
- `page_access` - Tipo de acesso (NFC/QR Code)
- `page_hidden` - Página foi minimizada
- `page_visible` - Página voltou ao foco

---

## 5️⃣ DEPLOYMENT (COLOCAR NO AR)

### Opção A: GitHub Pages (Gratuito)

```bash
# 1. Criar repositório em GitHub
# 2. Fazer upload dos arquivos

# Comando (se souber usar Git):
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ThiagoVieira04/Papel-e-Sonhos-Connect.git
git push -u origin main

# 3. Ir em Settings → Pages
# 4. Escolher "Deploy from branch" → main
# 5. Aguardar o Deploy

# URL será:
https://seu-usuario.github.io/seu-repo/
```

### Opção B: Netlify (Recomendado - Gratuito)

```bash
# 1. Acessar https://app.netlify.com
# 2. Fazer login com GitHub
# 3. Conectar repositório
# 4. Deploy automático em: seu-repositorio.netlify.app

# Ou fazer upload direto (sem código):
# Arrastar pasta com arquivos para o site
```

### Opção C: Seu Próprio Servidor (Pago)

```bash
# 1. Comprar hosting (UOL, Hostinger, Locaweb, etc)
# 2. Fazer FTP upload dos arquivos
# 3. Apontar domínio
# 4. Ativar HTTPS (Let's Encrypt gratuito)
```

### Opção D: Vercel (Gratuito + Pago)

```bash
# 1. Acessar https://vercel.com
# 2. Fazer login/criar conta
# 3. Importar repositório GitHub
# 4. Deploy automático
```

---

## 6️⃣ DOMÍNIO PRÓPRIO

### Comprar Domínio

Recomendações:
- Namecheap (barato)
- GoDaddy (fácil)
- Registro.br (com .br)

Exemplo: `papelesonhos.com.br`

### Conectar Domínio em GitHub Pages

```
No seu Painel do Registrador:
1. DNS Management
2. Adicione registros CNAME:
   Hostname: www
   Value: seu-usuario.github.io

3. Adicione registros A:
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153

4. No GitHub:
   Settings → Pages → Custom domain
   Coloque: papelesonhos.com.br
   Marque: Enforce HTTPS
```

---

## 7️⃣ HTTPS (Segurança)

### GitHub Pages
✅ Automático - HTTPS habilitado por padrão

### Netlify
✅ Automático - HTTPS habilitado por padrão

### Seu Servidor
1. Usar Let's Encrypt (gratuito)
2. Ou comprar certificado SSL
3. Configurar no Apache/Nginx

---

## 8️⃣ CUSTOMIZAÇÃO AVANÇADA

### Adicionar Novo Botão

No `index.html`, adicione:

```html
<button class="link-button seu-btn" data-action="open-link" 
        data-link="https://seu-link.com">
    <div class="button-icon">
        <i class="fas fa-icon-aqui"></i>  <!-- Ver Font Awesome -->
    </div>
    <div class="button-content">
        <h3>Seu Botão</h3>
        <p>Descrição</p>
    </div>
</button>
```

No `style.css`, adicione:

```css
.seu-btn .button-icon {
    background: linear-gradient(135deg, #color1, #color2);
    color: #ffffff;
}

.seu-btn:hover .button-icon {
    transform: scale(1.1);
}
```

### Mudar Cores

Edite o `style.css`:

```css
:root {
    --primary-dark: #000000;      /* Mude para sua cor */
    --primary-light: #333333;
    --accent-yellow: #FF0000;     /* Mude para sua cor */
}
```

### Adicionar Logo Customizado

```html
<!-- Substitua o ícone "P" por sua logo -->
<div class="logo">
    <img src="seu-logo.png" alt="Logo" />
</div>

<!-- Ou use um ícone diferente -->
<div class="logo">
    <i class="fas fa-print"></i>  <!-- Ícone de impressora -->
</div>
```

---

## 9️⃣ ÍCONES DISPONÍVEIS

Todos os ícones são do Font Awesome. Veja em:
https://fontawesome.com/icons

Exemplos úteis:
- `fa-star` ⭐ Avaliação
- `fa-whatsapp` 💬 WhatsApp
- `fa-instagram` 📸 Instagram
- `fa-facebook` 📘 Facebook
- `fa-money-bill` 💰 Pagamento
- `fa-qrcode` 📱 QR Code
- `fa-print` 🖨️ Impressora
- `fa-file` 📄 Documentos
- `fa-phone` ☎️ Telefone
- `fa-location-dot` 📍 Localização

---

## 🔟 PERFORMANCE & SEO

### Otimizar Imagens

Se adicionar imagens:
```html
<img src="sua-imagem.jpg" 
     loading="lazy" 
     alt="Descrição da imagem"
     width="400" 
     height="300" />
```

### Meta Tags Importantes

No `index.html`, customize:

```html
<meta name="description" 
      content="Descrição curta (155 caracteres máximo)">
<meta name="keywords" 
      content="papel, impressão, RJ">
<meta property="og:title" content="Seu Título">
<meta property="og:description" content="Sua descrição">
<meta property="og:image" content="https://seu-dominio.com/imagem.jpg">
```

### Testar Velocidade

- Google PageSpeed: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/
- WebPageTest: https://www.webpagetest.org/

---

## 1️⃣1️⃣ TROUBLESHOOTING

| Problema | Solução |
|----------|---------|
| Links não abrem | Verificar URL em `data-link` |
| QR Code não mostra | Verificar console (F12) para erros |
| Cópia não funciona | Usar HTTPS, não HTTP |
| Página carrega lenta | Otimizar imagens, usar CDN |
| NFC não escreve | Usar app correto, tag compatível |
| Analytics não registra | Verificar ID do Google Analytics |
| Cores erradas | Limpar cache (Ctrl+F5) |

---

## 1️⃣2️⃣ CHECKLIST FINAL

- [ ] Atualizou chave Pix em `script.js`
- [ ] Atualizou telefone WhatsApp
- [ ] Atualizou links Instagram e Facebook
- [ ] Testou em celular
- [ ] Testou em desktop
- [ ] Testou modo escuro
- [ ] Copiou chave Pix corretamente
- [ ] QR Code gera corretamente
- [ ] HTTPS configurado
- [ ] Meta tags customizadas
- [ ] Google Analytics adicionado (opcional)
- [ ] NFC tag configurada
- [ ] Domínio apontando corretamente

---

**Parabéns! Sua landing page está pronta! 🎉**

Para dúvidas, consulte o `README.md` ou a documentação oficial das ferramentas.
