# Karvi Project

## Instrucciones para levantar el proyecto

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/mdominguez56/karvi
   ```

2. Instalar dependencias con npm:
   ```bash
   npm install
   ```

3. Levantar el proyecto:
   ```bash
   npm run dev
   ```

## APP desplegada en Vercel
Para acceder directamente a la aplicación sin tener que correr el proyecto localmente, puedes acceder al siguiente link:
[https://karvi-ten.vercel.app/](https://karvi-ten.vercel.app/)

## Tecnologías usadas

- **Next.js**
- **React**
- **Tailwind CSS**
- **Typescript**
- **Jest**

## Principales puntos a tener en cuenta

- Se agregaron **SEO tags**, siguiendo buenas prácticas de SEO (tome como referencia el sitio de [https://www.karvi.com.br/](https://www.karvi.com.br/)).
- Se agrego sitemap del sitio.
- Se agregaron **imágenes iguales para todos los autos**, teniendo en cuenta que la API no estaba devolviendo imágenes, para así poder realizar el carrousel de fotos.
- Se utilizó **useContext** para almacenar el estado de los **Favoritos**.
- Todos los **types de TypeScript** se pusieron en el archivo `types.ts`.
- Se agregaron algunas **pruebas unitarias** con **Jest**.

## Features y mejoras pendientes

- Agregar **más pruebas unitarias**.
- **Fix** botón de "Ver Favoritos".
- **Situar correctamente** el icono de agregar a favoritos en Card de autos.
- **Se pueden mejorar las practicas de SEO**, como por ejemplo agregando H1 y H2 al site (no los agregue porque no los vi en el Figma) y agregando meta tags especificos para cada url (home y favorites).
- Agregar **linters** al proyecto.