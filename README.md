# Canto do Curió Rações

Página institucional para o pet shop **Canto do Curió Rações**, oferecendo um link único com todas as formas de contato, pagamento e localização. O objetivo é facilitar o acesso do cliente a serviços como WhatsApp, redes sociais, pagamento por Pix, conexão Wi-Fi e avaliação no Google.

---

## Funcionalidades

- **WhatsApp** — Abre conversa direta com atendimento
- **Avaliação no Google** — Redireciona para a página de avaliação do estabelecimento
- **Instagram** — Acessa o perfil oficial do pet shop
- **Facebook** — Acessa a página do estabelecimento
- **Localização** — Abre o Google Maps com a localização do pet shop
- **Pagamento Pix** — Exibe a chave Pix com opção de copiar e botão para abrir o aplicativo bancário
- **Seletor de Bancos** — Abre o app bancário instalado no celular (Android via Intent, iOS via Deep Link) com fallback para loja de aplicativos
- **WiFi Grátis** — Exibe nome e senha da rede Wi-Fi, com opção de copiar senha e botão para abrir configurações de Wi-Fi do dispositivo
- **QR Code da Página** — Gera QR Code para compartilhamento com opção de download
- **Modo Escuro** — Tema escuro ativado por padrão, com botão para alternar
- **Design Responsivo** — Interface adaptada para celular, tablet e desktop

---

## Tecnologias Utilizadas

- **HTML5** — Estrutura da página
- **CSS3** — Estilos, responsividade e tema escuro/claro
- **JavaScript** — Lógica das funcionalidades (vanilla, sem frameworks)
- **Font Awesome 6.4** — Ícones (via CDN)
- **QRCode.js** — Geração de QR Code (via CDN)
- **Vercel** — Hospedagem e deploy

---

## Como Executar o Projeto

### Visualizar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/ThiagoVieira04/Canto-do-Curio-Connect.git
   ```

2. Abra o arquivo `index.html` diretamente no navegador.

> Não é necessário instalar dependências. O projeto é composto apenas por arquivos estáticos (HTML, CSS e JavaScript).

### Deploy na Vercel

O repositório já possui o arquivo `vercel.json` configurado. Basta conectar o repositório GitHub à Vercel para que o deploy seja feito automaticamente.

---

## Compatibilidade

| Plataforma | Suporte |
|-----------|---------|
| Android (Chrome e outros) | Completo |
| iOS (Safari) | Completo |
| Desktop (Windows, macOS, Linux) | Completo |

---

## Observações

- **Abertura de apps bancários:** No Android, o aplicativo é aberto via Intent URL. No iOS, o sistema exibe um alerta perguntando se o usuário deseja abrir o app. Em desktop, o site redireciona para a loja de aplicativos.
- **Configurações de Wi-Fi:** No Android, o botão "Conectar Agora" abre diretamente a tela de Wi-Fi. No iOS, abre os Ajustes gerais (o usuário precisa selecionar Wi-Fi manualmente, pois a Apple não permite acesso direto).
- **Chave Pix:** A chave é copiada automaticamente ao clicar em "Abrir meu banco" ou no botão copiar.
- **Modo escuro:** Ativado por padrão. O botão no canto superior direito permite alternar para o modo claro.

---

## Estrutura do Projeto

```
├── index.html        # Página principal
├── style.css         # Estilos e responsividade
├── script.js         # Funcionalidades
├── manifest.json     # Configuração PWA
├── vercel.json       # Configuração de deploy
├── logo.png          # Logo do pet shop
├── logo-google.png   # Ícone do Google
├── pix.png           # QR Code para pagamento Pix
├── local.gif         # Ícone de localização
├── preview.png       # Imagem de pré-visualização
└── .gitignore        # Arquivos ignorados pelo Git
```

---

## Contato

- **WhatsApp:** [+55 21 97351-6734](https://wa.me/5521973516734)
- **Instagram:** [@cantodocurioracoes](https://www.instagram.com/cantodocurioracoes/)
- **Facebook:** [Canto do Curió Rações](https://www.facebook.com/canto.do.curio.racoes/)

---

## Desenvolvedor

Este projeto foi desenvolvido por **Papel e Sonhos Informática**.

---

## Licença

Este projeto é de uso exclusivo do seu proprietário. Todos os direitos reservados.
