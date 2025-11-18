# 🚀 Startup CRM - Frontend

Sistema CRM inteligente con integración nativa a WhatsApp y correo electrónico, diseñado para startups que gestionan relaciones con leads y clientes en tiempo real.

## 📋 Tabla de Contenidos

- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Descripción de Carpetas Principales](#descripción-de-carpetas-principales)
- [Configuración](#configuración)
- [Guía de Estilo](#guía-de-estilo)

---

## 🛠️ Tecnologías

- **Framework:** Angular 20
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4 + CSS + Angular Material
- **Gestión de Estado:** Angular Signals
- **HTTP Client:** Angular HttpClient
- **Iconos:** Lucide Angular
- **Manejo de Fechas:** date-fns
- **Arquitectura:** Standalone Components

---

## 📦 Requisitos Previos

Asegúrate de tener instalado:

- **Node.js:** v18.x o v20.x LTS
- **npm:** v9.x o superior
- **Angular CLI:** v20.x

### Verificar instalación
```bash
node --version
npm --version
ng version
```

---

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/S11-25-Equipo-53-WebApp/cliente.git
cd crm-frontend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno

Crear archivo `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  whatsappApiUrl: 'https://graph.facebook.com/v18.0',
  emailApiUrl: 'https://api.brevo.com/v3'
};
```

### 4. Iniciar servidor de desarrollo
```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`

---

## 📁 Estructura del Proyecto
```
src/
├── app/
│   ├── core/                                # Funcionalidades core de la aplicación   
│   │   ├── guards/                          # Guards de navegación y autenticación   
│   │   │   └── auth.guard.ts                # Protección de rutas autenticadas   
│   │   ├── interceptors/                    # Interceptores HTTP   
│   │   │   └── auth.interceptor.ts          # Añade token JWT a requests   
│   │   ├── services/                        # Servicios singleton globales   
│   │   │   ├── api.service.ts               # Servicio base para HTTP requests   
│   │   │   ├── auth.service.ts              # Gestión de autenticación   
│   │   │   └── storage.service.ts           # Gestión de localStorage/sessionStorage   
│   │   └── models/                          # Interfaces y tipos globales   
│   │       ├── user.interface.ts            # Modelo de usuario   
│   │       └── api-response.interface.ts    # Estructura de respuestas API   
│   │
│   ├── shared/                              # Recursos compartidos entre módulos   
│   │   ├── components/                      # Componentes reutilizables   
│   │   │   ├── button/                      # Botones personalizados   
│   │   │   ├── modal/                       # Modales reutilizables   
│   │   │   ├── table/                       # Tablas con funcionalidades comunes   
│   │   │   ├── search-bar/                  # Barra de búsqueda   
│   │   │   └── loader/                      # Indicadores de carga   
│   │   ├── pipes/                           # Pipes personalizados   
│   │   │   ├── date-format.pipe.ts          # Formateo de fechas   
│   │   │   └── phone-format.pipe.ts         # Formateo de números telefónicos   
│   │   ├── directives/                      # Directivas personalizadas   
│   │   │   └── click-outside.directive.ts   # Detectar clicks fuera de elemento   
│   │   └── models/                          # Interfaces compartidas   
│   │       └── pagination.interface.ts      # Modelo de paginación   
│   │
│   ├── features/                            # Módulos de funcionalidades principales   
│   │   │
│   │   ├── contacts/                        # Gestión de contactos    
│   │   │   ├── components/
│   │   │   │   ├── contact-list/            # Lista de contactos   
│   │   │   │   ├── contact-detail/          # Detalle de contacto   
│   │   │   │   ├── contact-form/            # Formulario crear/editar   
│   │   │   │   └── contact-filters/         # Filtros y búsqueda   
│   │   │   ├── services/   
│   │   │   │   └── contacts.service.ts      # API de contactos   
│   │   │   └── models/   
│   │   │       └── contact.interface.ts     # Modelo de contacto   
│   │   │
│   │   ├── messages/                        # Módulo de mensajería   
│   │   │   ├── components/   
│   │   │   │   ├── chat-list/               # Lista de conversaciones   
│   │   │   │   ├── chat-window/             # Ventana de chat   
│   │   │   │   ├── message-composer/        # Compositor de mensajes   
│   │   │   │   └── email-templates/         # Plantillas de email   
│   │   │   ├── services/   
│   │   │   │   ├── whatsapp.service.ts      # Integración WhatsApp   
│   │   │   │   └── email.service.ts         # Integración Email   
│   │   │   └── models/   
│   │   │       ├── message.interface.ts     # Modelo de mensaje   
│   │   │       └── conversation.interface.ts # Modelo de conversación   
│   │   │
│   │   ├── analytics/                       # Dashboard y métricas   
│   │   │   ├── components/   
│   │   │   │   ├── dashboard/               # Vista principal del dashboard   
│   │   │   │   ├── kpi-cards/               # Tarjetas de KPIs   
│   │   │   │   └── charts/                  # Gráficos y visualizaciones   
│   │   │   ├── services/   
│   │   │   │   └── analytics.service.ts     # API de métricas   
│   │   │   └── models/   
│   │   │       └── metrics.interface.ts     # Modelos de métricas   
│   │   │
│   │   ├── auth/                            # Autenticación y autorización   
│   │   │   ├── components/    
│   │   │   │   ├── login/                   # Formulario de login   
│   │   │   │   ├── register/                # Formulario de registro   
│   │   │   │   └── forgot-password/         # Recuperación de contraseña   
│   │   │   └── services/   
│   │   │       └── auth-api.service.ts      # API de autenticación   
│   │   │
│   │   └── settings/                        # Configuración de la aplicación   
│   │       ├── components/    
│   │       │   ├── profile/                 # Perfil de usuario    
│   │       │   ├── preferences/             # Preferencias generales   
│   │       │   └── integrations/            # Configuración de APIs externas    
│   │       └── services/   
│   │           └── settings.service.ts      # API de configuración   
│   │
│   ├── layout/                             # Componentes de layout principal   
│   │   ├── header/                         # Header/Navbar    
│   │   │   ├── header.component.ts   
│   │   │   ├── header.component.html   
│   │   │   └── header.component.css   
│   │   ├── sidebar/                        # Menú lateral de navegación   
│   │   │   ├── sidebar.component.ts   
│   │   │   ├── sidebar.component.html    
│   │   │   └── sidebar.component.css   
│   │   └── footer/                        # Footer   
│   │       ├── footer.component.ts   
│   │       ├── footer.component.html   
│   │       └── footer.component.css   
│   │
│   ├── app.component.ts                   # Componente raíz   
│   ├── app.component.html   
│   ├── app.component.css   
│   ├── app.config.ts                      # Configuración de la aplicación   
│   └── app.routes.ts                      # Definición de rutas   
│   
├── assets/                                # Recursos estáticos   
│   ├── images/                            # Imágenes   
│   ├── icons/                             # Iconos personalizados   
│   └── fonts/                             # Fuentes personalizadas   
│
├── environments/                          # Variables de entorno   
│   ├── environment.ts                     # Desarrollo   
│   └── environment.prod.ts                # Producción   
│
└── styles.css                             # Estilos globales   
```

---

## 📂 Descripción de Carpetas Principales

### **`core/`** - Núcleo de la Aplicación

Contiene servicios singleton, guards, interceptors y modelos que se utilizan en toda la aplicación.

- **`guards/`**: Protección de rutas (autenticación, autorización)
- **`interceptors/`**: Interceptores HTTP (añadir tokens, manejo de errores)
- **`services/`**: Servicios globales compartidos por toda la app
- **`models/`**: Interfaces y tipos TypeScript globales

**Regla:** Los servicios en `core/` son **singleton** y se proveen en el root.

---

### **`shared/`** - Recursos Compartidos

Componentes, pipes, directivas y modelos reutilizables en múltiples módulos.

- **`components/`**: Componentes UI reutilizables (botones, modales, tablas)
- **`pipes/`**: Pipes personalizados para transformación de datos
- **`directives/`**: Directivas personalizadas
- **`models/`**: Interfaces compartidas entre módulos

**Regla:** Todo en `shared/` debe ser **reutilizable** y sin lógica de negocio específica.

---

### **`features/`** - Módulos de Funcionalidades

Cada carpeta dentro de `features/` representa un módulo funcional completo del CRM.

#### **`contacts/`** - Gestión de Contactos
- CRUD completo de contactos
- Segmentación por estado del funnel
- Sistema de etiquetas
- Búsqueda y filtros avanzados

#### **`messages/`** - Mensajería
- Integración con WhatsApp Cloud API
- Envío y recepción de emails
- Plantillas de mensajes
- Historial de conversaciones

#### **`analytics/`** - Analítica y Métricas
- Dashboard con KPIs
- Gráficos de métricas
- Reportes exportables
- Visualización de datos

#### **`auth/`** - Autenticación
- Login/Logout
- Registro de usuarios
- Recuperación de contraseña
- Gestión de sesiones

#### **`settings/`** - Configuración
- Perfil de usuario
- Preferencias de la aplicación
- Configuración de integraciones
- Personalización

**Regla:** Cada feature es **independiente** y contiene su propia lógica de negocio.

---

### **`layout/`** - Componentes de Layout

Estructura visual principal de la aplicación.

- **`header/`**: Barra de navegación superior
- **`sidebar/`**: Menú lateral de navegación
- **`footer/`**: Pie de página

**Regla:** Los componentes de layout son **presentacionales** y no contienen lógica de negocio.

---

---

## ⚙️ Configuración

### Variables de Entorno

Las variables de entorno se configuran en:

- **Desarrollo:** `src/environments/environment.ts`
- **Producción:** `src/environments/environment.prod.ts`
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  whatsappApiUrl: 'https://graph.facebook.com/v18.0',
  emailApiUrl: 'https://api.brevo.com/v3'
};
```

### Configuración de Tailwind CSS

El proyecto utiliza **Tailwind CSS v4** con PostCSS. La configuración se encuentra en:

**`.postcssrc.json`** (raíz del proyecto):
```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

**`src/styles.css`**:
```css
/* Importar Tailwind */
@import "tailwindcss";

/* Plugin de formularios de Tailwind */
@plugin "@tailwindcss/forms";

/* Estilos de Angular Material/CDK */
@import '@angular/cdk/overlay-prebuilt.css';
```


### Configuración de Angular Material

El tema se configura en `src/styles.scss`:
```scss
@use '@angular/material' as mat;

@include mat.core();

$primary-palette: mat.define-palette(mat.$azure-palette);
$accent-palette: mat.define-palette(mat.$blue-palette);

$theme: mat.define-light-theme((
  color: (
    primary: $primary-palette,
    accent: $accent-palette,
  )
));

@include mat.all-component-themes($theme);
```

---

## 🎨 Guía de Estilo

### Nomenclatura

- **Componentes:** `kebab-case` (ej: `contact-list.component.ts`)
- **Servicios:** `kebab-case` (ej: `contacts.service.ts`)
- **Interfaces:** `PascalCase` con sufijo `Interface` (ej: `ContactInterface`)
- **Variables:** `camelCase`
- **Constantes:** `UPPER_SNAKE_CASE`

### Estructura de archivos
```
nombre-componente/
├── nombre-componente.component.ts      # Lógica del componente
├── nombre-componente.component.html    # Template
├── nombre-componente.component.scss    # Estilos
└── nombre-componente.component.spec.ts # Tests
```

### Buenas prácticas

- ✅ Usar **Signals** para estado reactivo
- ✅ Componentes **standalone** por defecto
- ✅ Servicios provistos en **root** cuando sean singleton
- ✅ **OnPush** change detection cuando sea posible
- ✅ Lazy loading para features
- ✅ Evitar lógica en templates
- ✅ Mantener componentes pequeños y enfocados

---