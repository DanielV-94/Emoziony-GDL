#!/bin/bash

# ============================================
# QUICK START SCRIPT - EMOZIONI BACKEND
# ============================================

echo "🎁 Emozioni Backend - Quick Start"
echo "=================================="
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    echo "📥 Descarga desde: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"
echo "✅ npm encontrado: $(npm --version)"
echo ""

# Verificar si estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json no encontrado"
    echo "💡 Ejecuta este script desde la carpeta backend/"
    exit 1
fi

echo "📦 Instalando dependencias..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error al instalar dependencias"
    exit 1
fi

echo ""
echo "✅ Dependencias instaladas correctamente"
echo ""

# Verificar si existe .env
if [ ! -f ".env" ]; then
    echo "⚠️  Archivo .env no encontrado"
    echo "📝 Creando .env desde .env.example..."
    cp .env.example .env
    echo ""
    echo "⚠️  IMPORTANTE: Edita el archivo .env con tus credenciales:"
    echo "   1. Twilio (WhatsApp)"
    echo "   2. Email (Gmail/SendGrid)"
    echo "   3. Datos de la tienda"
    echo ""
    echo "📖 Lee backend/README.md para instrucciones detalladas"
    echo ""
    
    # Abrir .env en el editor por defecto (si está disponible)
    if command -v code &> /dev/null; then
        echo "🚀 Abriendo .env en VS Code..."
        code .env
    elif command -v nano &> /dev/null; then
        echo "🚀 Abriendo .env en nano..."
        nano .env
    else
        echo "💡 Abre manualmente: backend/.env"
    fi
    
    exit 0
fi

echo "✅ Archivo .env encontrado"
echo ""

# Iniciar servidor
echo "🚀 Iniciando servidor en modo desarrollo..."
echo "📡 URL: http://localhost:3000"
echo "🔍 Health Check: http://localhost:3000/api/health"
echo ""
echo "Presiona Ctrl+C para detener el servidor"
echo "=================================="
echo ""

npm run dev
