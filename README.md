# Frontend React

Interfaz de usuario construida con **React 19** y **Vite**. Arquitectura basada en componentes reutilizables con gestión de estado centralizada en `App.jsx`. La misma app que Vanilla JS, pero con componentes, estado declarativo y toda la potencia del ecosistema React.

---

## 📋 Descripción

SPA (Single Page Application) que permite navegar, filtrar, crear, editar, votar y comentar enlaces. La navegación entre vistas se controla mediante estado de React, sin librerías de routing externas.

---

## 🛠️ Tecnologías

| Herramienta | Versión | Uso |
|---|---|---|
| React | 19.2.6 | UI declarativa con componentes |
| Vite | 8.0.12 | Bundler y servidor de desarrollo |
| ESLint | 10.3.0 | Linting de código |

---

## 📁 Estructura del proyecto

```
frontend-react/
├── index.html
├── vite.config.js
├── eslint.config.js
├── package.json
└── src/
    ├── main.jsx               # Punto de entrada, monta App en el DOM
    ├── App.jsx                # Componente raíz, estado global y navegación
    ├── api/
    │   └── api.js             # Todas las llamadas al backend
    └── components/
        ├── TagsFilter.jsx     # Botones de filtro por etiqueta
        ├── LinksList.jsx      # Lista de enlaces
        ├── LinkDetails.jsx    # Detalle, votos y comentarios
        ├── CreateLink.jsx     # Formulario de creación
        └── UpdateLink.jsx     # Formulario de edición
```

---

## ⚙️ Instalación y uso

### Requisito previo

Tener el **backend corriendo** en `http://localhost:3000`. Ver el README del backend para instrucciones.

### 1. Clonar el repositorio e instalar dependencias

```bash
git clone <url-del-repo>
cd frontend-react
npm install
```

### 2. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La app quedará disponible en `http://localhost:5173` (por defecto de Vite).

### 3. Build para producción

```bash
npm run build
```

Genera la carpeta `dist/` con los archivos estáticos listos para desplegar.

### 4. Preview del build

```bash
npm run preview
```

---

## 🧭 Arquitectura y flujo de navegación

La navegación se maneja con variables de estado en `App.jsx`. No hay React Router. Dependiendo del estado, `App` renderiza condicionalmente uno u otro componente.

```
App.jsx  (estado global)
│
├── createLinkForm === true
│     └── <CreateLinkComponent />
│
├── seeMoreID !== null
│     └── <LinkDetailsComponent linkID={seeMoreID} />
│
├── updateLinkID !== null
│     └── <UpdateLinkComponent linkId={updateLinkID} />
│
└── (default)
      ├── <TagsFilterComponent tags={tags} />
      └── <LinksListComponent links={links} />
```

---

## 📌 Componentes

### `App.jsx`

Componente raíz que centraliza todo el estado de la aplicación:

| Estado | Tipo | Descripción |
|---|---|---|
| `tags` | Array | Etiquetas disponibles |
| `selectedTag` | String | Etiqueta activa para filtrar |
| `links` | Array | Enlaces mostrados en la lista |
| `seeMoreID` | String / null | ID del enlace en vista detalle |
| `updateLinkID` | String / null | ID del enlace en edición |
| `createLinkForm` | Boolean | Muestra/oculta formulario de creación |

### `TagsFilter.jsx`

Recibe el array de etiquetas y una función `filter`. Renderiza un botón por etiqueta más el botón "Todos". Al hacer click llama a `filter(tag._id)`.

### `LinksList.jsx`

Recibe el array de enlaces y las funciones `seeMore` y `onCreate`. Renderiza una tarjeta por enlace con el botón "Ver más" y un botón global para crear un nuevo enlace.

### `LinkDetails.jsx`

Recibe `linkID` como prop, obtiene los datos del backend con `useEffect` y muestra el detalle completo. Maneja votos y comentarios localmente actualizando el estado con spread operator para evitar re-fetches innecesarios.

### `CreateLink.jsx`

Formulario controlado con `useState` para cada campo. Al enviar, llama a `createLink()` de la API y pasa el nuevo enlace al padre mediante `onCreateLink(newLink)`.

### `UpdateLink.jsx`

Pre-carga los datos actuales del enlace en `useEffect` al montar. Al enviar, llama a `updateLink()` y notifica al padre con `onLinkUpdateSuccess(linkUpdate)` para actualizar la lista sin re-fetchear todo.

---

## 🔌 Capa de API — `api.js`

Todas las llamadas al backend están centralizadas en `src/api/api.js`. Cada función lanza (`throw`) el error en caso de fallo para que el componente consumidor pueda manejarlo.

| Función | Método | Endpoint |
|---|---|---|
| `getTags()` | GET | `/app/tags` |
| `getLinks(id)` | GET | `/app/links[?id=]` |
| `getLinksDetails(id)` | GET | `/app/details/:id` |
| `createLink(...)` | POST | `/api/create` |
| `updateLink(...)` | PUT | `/api/update/:id` |
| `deleteLink(id)` | DELETE | `/api/delete/:id` |
| `addComment(id, text)` | PATCH | `/api/comment/:id` |
| `addVote(id)` | PATCH | `/api/vote/:id` |

La URL base está configurada directamente en `api.js`:

```js
http://localhost:3000
```

Para apuntar a otro backend, actualizar las URLs en ese archivo.

---


## 📌 Notas

- El `useEffect` de `tags` en `App.jsx` tiene `[tags]` como dependencia, lo que puede causar re-renders. Para optimizar, se puede cambiar a `[]`.
- La actualización de votos y comentarios en `LinkDetails.jsx` usa spread operator (`...link`) para mantener todos los campos y sobreescribir solo el campo modificado, evitando un fetch adicional.
- El formulario de `UpdateLink.jsx` muestra un `<p>Cargando...</p>` mientras los datos del enlace no estén disponibles, evitando inputs vacíos en el primer render.

---

*© Todos los derechos reservados — Victor Nunez*
