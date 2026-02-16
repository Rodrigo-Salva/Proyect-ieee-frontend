# 🚀 Proyect IEEE Frontend

Frontend React + TypeScript con Vite para el proyecto IEEE.

## 📋 Características

- ⚛️ React 18 + TypeScript
- ⚡ Vite para desarrollo rápido
- 🔐 Autenticación JWT
- 🎨 Diseño moderno y responsivo
- 📡 Integración completa con API Django

## 🛠 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build
```

## 🌐 Configuración

El archivo `.env` contiene la URL de la API:

```env
VITE_API_URL=http://localhost:8000/api
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Login.tsx       # Formulario de login
│   ├── NewsList.tsx    # Lista de noticias
│   └── ProtectedRoute.tsx  # Rutas protegidas
├── context/            # Context API
│   └── AuthContext.tsx # Contexto de autenticación
├── services/           # Servicios API
│   ├── api.ts         # Cliente Axios configurado
│   ├── auth.service.ts    # Servicio de autenticación
│   └── content.service.ts # Servicio de contenido
├── App.tsx            # Componente principal
└── main.tsx           # Punto de entrada
```

## 🔑 Autenticación

El proyecto usa JWT (JSON Web Tokens) para autenticación:

1. Login en `/login`
2. Los tokens se guardan en localStorage
3. El interceptor de Axios agrega automáticamente el token a las peticiones
4. Refresh automático de tokens cuando expiran

## 📡 Servicios API Disponibles

### Autenticación
- `authService.login(username, password)` - Login
- `authService.logout()` - Logout
- `authService.getCurrentUser()` - Obtener usuario actual

### Contenido
- `contentService.getNews()` - Listar noticias
- `contentService.getEvents()` - Listar eventos
- `contentService.getAnnouncements()` - Listar anuncios

Ver `src/services/` para más métodos disponibles.

## 🎨 Componentes

### Login
Formulario de autenticación con validación y manejo de errores.

### NewsList
Muestra las noticias desde la API con diseño de tarjetas.

### ProtectedRoute
Wrapper para proteger rutas que requieren autenticación.

## 🚀 Desarrollo

El servidor de desarrollo se ejecuta en `http://localhost:5173/`

```bash
npm run dev
```

## 📦 Build

```bash
npm run build
```

Los archivos de producción se generan en `dist/`

## 🔗 Backend

Este frontend se conecta al backend Django en `http://localhost:8000/api`

Asegúrate de que el backend esté corriendo antes de iniciar el frontend.

## 📝 Notas

- CORS está configurado en el backend para permitir `localhost:5173`
- Los tokens JWT expiran en 5 horas
- El refresh token expira en 1 día
