#!/bin/bash
echo "🔄 Testando configuração do Nginx..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Configuração OK! Recarregando Nginx..."
    sudo systemctl reload nginx
    echo "✅ Nginx recarregado com sucesso!"
else
    echo "❌ Erro na configuração! Corrige antes de recarregar."
fi
