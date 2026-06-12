@echo off
echo === Iniciando Upload para Papel-e-Sonhos-Connect ===
git init
git add .
git commit -m "Initial commit: Landing Page Papel e Sonhos Connect"
git branch -M main
git remote add origin https://github.com/ThiagoVieira04/Papel-e-Sonhos-Connect.git
:: Caso o remote ja exista, o comando acima falhara, o que e normal.
git remote set-url origin https://github.com/ThiagoVieira04/Papel-e-Sonhos-Connect.git

echo Enviando arquivos...
git push -u origin main
echo === Processo Concluido! Verifique seu GitHub. ===
pause