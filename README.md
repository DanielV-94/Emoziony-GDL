# 🎁 Emozioni - Delivering Happiness

![Emozioni Logo](rsc/logo/color.svg)

## 📋 Descripción del Proyecto

**Emozioni** es una plataforma web moderna y elegante diseñada para una empresa de desayunos y comidas sorpresa en Guadalajara, México. El sitio web combina diseño minimalista, efectos glassmorphism y animaciones fluidas para crear una experiencia visual memorable que refleja la esencia de la marca: entregar emociones, no solo productos.

### 🎯 Características Principales

- ✅ **Diseño Responsive**: Totalmente adaptable a dispositivos móviles, tablets y desktop
- ✅ **Efectos Visuales Premium**: Glassmorphism, mesh gradients animados y efectos liquid glass
- ✅ **Formulario Bento Grid**: Sistema modular de contacto con diseño asimétrico
- ✅ **Sistema de Notificaciones Automáticas**: Backend Node.js con 3 flujos simultáneos
- ✅ **Optimización SEO**: Meta tags completos y estructura semántica
- ✅ **Experiencia de Usuario Superior**: Smooth scroll, animaciones sutiles y navegación intuitiva

### 🚀 **NUEVO: Sistema de Notificaciones Automáticas**

Cuando un cliente envía una cotización, el sistema ejecuta **3 acciones simultáneas**:

1. 📱 **WhatsApp al dueño** - Notificación instantánea vía Twilio
2. 📧 **Email al dueño** - Cotización completa con diseño profesional
3. 📧 **Email al cliente** - Confirmación automática de recepción

**Stack Backend**:

- Node.js + Express
- Twilio WhatsApp Business API
- Nodemailer / SendGrid
- Rate limiting y seguridad (Helmet, CORS)

📖 **Guía completa**: Ver [`QUICK-START.md`](QUICK-START.md) para configuración en 5 minutos

---

## 🎨 Efectos y Animaciones

### 1. **Mesh Gradient Animado** (Bento Cards)

- **Descripción**: Fondo degradado multi-radial con movimiento orgánico
- **Duración**: 15s (principal) + 13s (overlay)
- **Efecto**: Crea una sensación de profundidad y movimiento sutil
- **Ubicación**: Formulario de contacto (todas las cards)

### 2. **Glassmorphism**

- **Descripción**: Efecto de vidrio esmerilado con blur
- **Implementación**: `backdrop-filter: blur(20px)`
- **Características**:
  - Transparencia controlada (10-40%)
  - Bordes semi-transparentes
  - Sombras internas y externas
- **Ubicación**: Header, bento cards, testimonios, footer

### 3. **Liquid Glass Effect** (Testimonios)

- **Descripción**: Brillo líquido animado que se mueve dentro de las tarjetas
- **Duración**: 8s
- **Keyframe**: `liquidGlass`
- **Efecto**: Simula un reflejo de luz moviéndose sobre una superficie de vidrio

### 4. **Liquid Shine Effect** (Testimonios)

- **Descripción**: Rayo de luz que atraviesa horizontalmente
- **Duración**: 6s
- **Keyframe**: `liquidShine`
- **Efecto**: Destello lineal de izquierda a derecha

### 5. **Pulse Animation** (Aviso de anticipación)

- **Descripción**: Pulsación suave con escala y brillo
- **Duración**: 4s
- **Efecto**: Atrae la atención sin ser invasivo

### 6. **Toggle Switches Personalizados**

- **Descripción**: Switches tipo iOS con animaciones fluidas
- **Características**:
  - Transición de 0.4s con cubic-bezier
  - Cambio de color al activar (azul neón)
  - Sombras animadas y glow effect
- **Ubicación**: Sección de extras en formulario

### 7. **Marquee Footer**

- **Descripción**: Logos animados en movimiento continuo
- **Duración**: 20-45s (múltiples velocidades)
- **Direcciones**: Alternadas (normal/reverse)
- **Efecto**: Fondo dinámico con profundidad

### 8. **Product Card Hover**

- **Descripción**: Elevación 3D con glow effect
- **Características**:
  - translateY(-10px)
  - Sombra neón azul
  - Glow radial debajo de la card

### 9. **Smooth Scroll**

- **Implementación**: `scroll-behavior: smooth` en `<html>`
- **Efecto**: Navegación suave entre secciones

---

## 📚 Librerías Externas Utilizadas

### 1. **GSAP (GreenSock Animation Platform)** - v3.11.4

- **CDN**: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js`
- **Uso**: Animaciones avanzadas de texto y elementos
- **Funcionalidades**:
  - Animación de entrada de elementos
  - Control de timeline
  - Easing personalizado

### 2. **GSAP ScrollTrigger** - v3.11.4

- **CDN**: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js`
- **Uso**: Animaciones activadas por scroll
- **Funcionalidades**:
  - Reveal de testimonios al hacer scroll
  - Pin de secciones
  - Parallax effects

### 3. **GSAP ScrollSmoother** - v3.11.4

- **CDN**: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollSmoother.min.js`
- **Uso**: Scroll ultra suave
- **Configuración**: Implementado en `main.js`

### 4. **SplitType**

- **CDN**: `https://unpkg.com/split-type`
- **Uso**: División de texto para animaciones carácter por carácter
- **Funcionalidades**:
  - Animación del hero title
  - Efectos tipográficos

---

## 🗂️ Estructura del Proyecto

```
emozioni/
│
├── frontend/
│   ├── index.html              # Página principal
│   ├── bolsa-trabajo.html      # Página de empleos
│   ├── privacidad.html         # Política de privacidad
│   ├── terminos-condiciones.html
│   │
│   ├── css/
│   │   └── style.css           # Estilos principales (2070 líneas)
│   │
│   └── js/
│       └── main.js             # Lógica principal y animaciones
│
├── rsc/
│   ├── font/
│   │   ├── Avenir.ttc          # Font principal
│   │   └── Vendetta.otf        # Font display
│   │
│   ├── img/                    # Imágenes de productos y recursos
│   ├── logo/                   # Variantes del logo (color, blanco, azul, negro, stamp)
│   └── video/                  # Videos de hero y testimonios
│
└── README.md
```

---

## 🎨 Paleta de Colores

```css
--color-primary: #56abcf; /* Azul Turquesa */
--color-primary-neon: #29d5ff; /* Azul Neón */
--color-secondary: #444243; /* Gris Oscuro */
--color-text: #333; /* Texto Principal */
--color-background: #ffffff; /* Fondo */
```

---

## 🔤 Tipografía

### Font Principal: **Avenir**

- Peso: Normal
- Formato: TrueType Collection (.ttc)
- Uso: Body text, navegación, inputs

### Font Display: **Vendetta**

- Peso: Normal
- Formato: OpenType (.otf)
- Uso: Títulos, headers, botones destacados

---

## 📱 Responsive Breakpoints

| Breakpoint | Descripción             | Grid Columns        |
| ---------- | ----------------------- | ------------------- |
| **1400px** | Desktop grande → Laptop | 6 → 4 cols          |
| **1024px** | Laptop → Tablet         | 4 → 2 cols          |
| **768px**  | Tablet → Mobile         | 2 → 1 col           |
| **576px**  | Mobile optimizado       | Ajustes específicos |

---

## 🚀 Optimizaciones Implementadas

### Performance

- ✅ Preload de video hero
- ✅ Lazy loading de imágenes
- ✅ Animaciones con GPU acceleration (transform, opacity)
- ✅ Backdrop-filter con fallback
- ✅ CSS minificado en producción (recomendado)

### SEO

- ✅ Meta tags completos (Open Graph, Twitter Cards)
- ✅ Estructura semántica HTML5
- ✅ Alt text en todas las imágenes
- ✅ Schema markup ready
- ✅ Sitemap y robots.txt ready

### Accesibilidad

- ✅ Contraste de colores WCAG AA
- ✅ Labels en formularios
- ✅ ARIA labels en navegación
- ✅ Focus states visibles
- ✅ Navegación por teclado

---

## 📦 Instalación y Uso

### Requisitos

- Servidor web local (Live Server, Five Server, etc.)
- Navegador moderno (Chrome, Firefox, Safari, Edge)

### Pasos

1. **Clonar o descargar el repositorio**

   ```bash
   git clone https://github.com/DanielV-94/Emoziony-GDL.git
   cd Emoziony-GDL
   ```

2. **Abrir con Live Server**

- Abre `index.html` con tu servidor local
- O usa la extensión "Five Server" en VS Code

3. **Configurar URLs**

   - Actualizar meta tags OG con URL final
   - Añadir favicon
   - Configurar posters de video

4. **Producción**
   - Minificar CSS y JS
   - Optimizar imágenes (WebP)
   - Configurar CDN para assets estáticos

---

## 🛠️ Personalización

### Cambiar Colores de Marca

Edita las variables CSS en `style.css` (líneas 17-24):

```css
:root {
  --color-primary: #56abcf;
  --color-primary-neon: #29d5ff;
  --color-secondary: #444243;
}
```

### Ajustar Velocidad de Animaciones

**Mesh Gradient** (línea 891-892):

```css
animation: meshGradient 15s ease-in-out infinite;
animation: meshGradientOverlay 13s ease-in-out infinite;
```

**Testimonios** (líneas 648-670):

```css
animation: liquidGlass 8s ease-in-out infinite;
animation: liquidShine 6s ease-in-out infinite;
```

### Modificar Productos

Edita los `<div class="product-card">` en `index.html` (líneas 100-300).

Atributos data:

- `data-price`: Precio del producto
- `data-includes`: Items incluidos (separados por coma)

---

## 📞 Integración WhatsApp

El formulario envía automáticamente a WhatsApp el mensaje formateado.

**Número configurado**: `+52 1 33 1331 0327`

**Formato del mensaje**:

```
🎉 NUEVA SOLICITUD DE COTIZACIÓN

📦 Producto: [Nombre]
💰 Precio Base: [Precio]

🎁 DESTINATARIO:
Nombre: [Nombre]
Dirección: [Dirección]
Teléfono: [Teléfono]

👤 TUS DATOS:
Email: [Email]
Celular: [Celular]
Motivo: [Ocasión]

📅 Entrega: [Fecha] a las [Hora]

💬 Mensaje: [Mensaje personalizado]

✨ Extras: [Lista de extras]
💵 TOTAL: $[Total] MXN
```

---

## 🌐 Navegación del Sitio

### Páginas Principales

1. **index.html** - Landing page principal
2. **bolsa-trabajo.html** - Vacantes disponibles
3. **privacidad.html** - Política de privacidad
4. **terminos-condiciones.html** - Términos y condiciones

### Secciones (index.html)

- `#inicio` - Hero con video
- `#filosofia` - Valores de la empresa
- `#catalogo` - Productos destacados
- `#testimonios` - Reseñas con video
- `#contacto` - Formulario Bento Grid

---

## 🎯 Futuras Mejoras

- [ ] Sistema de carrito de compras
- [ ] Integración con pasarela de pago
- [ ] Panel de administración
- [ ] Sistema de cupones/descuentos
- [ ] Blog de noticias
- [ ] Galería de entregas realizadas
- [ ] Chat en vivo
- [ ] Modo oscuro

---

## 📄 Licencia

Proyecto desarrollado para **Emozioni Guadalajara**.  
Todos los derechos reservados © 2025 Emozioni.

---

## 👨‍💻 Desarrollador

**GitHub**: [@DanielV-94](https://github.com/DanielV-94)  
**Repositorio**: [Emoziony-GDL](https://github.com/DanielV-94/Emoziony-GDL)

---

## 📞 Contacto Emozioni

- **Teléfono**: +52 1 33 1331 0327
- **Email**: hola@emozioni.com
- **Ubicación**: Guadalajara, Jalisco, México

---

## 🙏 Agradecimientos

- Fuentes: Avenir & Vendetta
- Librerías: GSAP, ScrollTrigger, SplitType
- Inspiración: Diseño moderno glassmorphism y bento grids

---

**¡Gracias por usar Emozioni!** 🎁✨
