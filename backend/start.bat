@echo off
REM ============================================
REM QUICK START SCRIPT - EMOZIONI BACKEND
REM ============================================

echo.
echo ========================================
echo   🎁 Emozioni Backend - Quick Start
echo ========================================
echo.

REM Verificar si Node.js está instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js no está instalado
    echo 📥 Descarga desde: https://nodejs.org/
    pause
    exit /b 1
)

node --version
npm --version
echo.

REM Verificar si estamos en el directorio correcto
if not exist "package.json" (
    echo ❌ Error: package.json no encontrado
    echo 💡 Ejecuta este script desde la carpeta backend/
    pause
    exit /b 1
)

echo 📦 Instalando dependencias...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Error al instalar dependencias
    pause
    exit /b 1
)

echo.
echo ✅ Dependencias instaladas correctamente
echo.

REM Verificar si existe .env
if not exist ".env" (
    echo ⚠️  Archivo .env no encontrado
    echo 📝 Creando .env desde .env.example...
    copy .env.example .env >nul
    echo.
    echo ⚠️  IMPORTANTE: Edita el archivo .env con tus credenciales:
    echo    1. Twilio (WhatsApp^)
    echo    2. Email (Gmail/SendGrid^)
    echo    3. Datos de la tienda
    echo.
    echo 📖 Lee backend/README.md para instrucciones detalladas
    echo.
    
    REM Abrir .env en el editor por defecto
    where code >nul 2>nul
    if %errorlevel% equ 0 (
        echo 🚀 Abriendo .env en VS Code...
        code .env
    ) else (
        echo 💡 Abre manualmente: backend\.env
        notepad .env
    )
    
    pause
    exit /b 0
)

echo ✅ Archivo .env encontrado
echo.

REM Iniciar servidor
echo ========================================
echo 🚀 Iniciando servidor en modo desarrollo...
echo 📡 URL: http://localhost:3000
echo 🔍 Health Check: http://localhost:3000/api/health
echo.
echo Presiona Ctrl+C para detener el servidor
echo ========================================
echo.

call npm run dev
