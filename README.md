 # Challenge 

## Descripción

Desafío de aplicación de recomendaciones de películas: construye una app para descubrir y explorar películas usando SSR con Next.js, la API de TMDb para obtener datos, y TypeScript para seguridad de tipos. Utiliza Material o Tailwind UI para la interfaz de usuario.


## Requisitos Previos
- **Node.js**: Asegúrate de tener Node.js instalado. Puedes verificarlo ejecutando `node -v` y `npm -v` en tu terminal.
- **npm o Yarn**: Utiliza el gestor de paquetes de tu preferencia.

## Instalación

1. **Clona el Repositorio**
   ```bash
   git clone [URL del Repositorio]
Accede al Directorio del Proyecto

2. **Accede al Directorio del Proyecto**
   ```bash
   cd [Nombre del Proyecto]

3. **Instala las Dependencias**
   ```bash
   npm install

4. **Ejecución en Desarrollo**
   ```bash
   npm run dev

## Rutas de la Aplicación

1. **`/`** - **Página de Inicio**: Esta página puedes buscar películas. Una vez que realizas una búsqueda y seleccionas "Buscar", se mostrarán los resultados correspondientes. Ejemplo: puedes buscar "The Shining" o "Harry Potter".
   
2. **`/register`** - **Registro**: Página para que los usuarios se registren en la aplicación.

3. **`/login`** - **Inicio de Sesión**: Página para que los usuarios inicien sesión en su cuenta. Ejemplo: puedes usar el usuario franco97@gmail.com y la contraseña franco1234.
4. **`/favorites`** - **Películas Favoritas**: Aquí puedes ver las películas que has marcado como favoritas desde la página de inicio.

5. **`/movie/[id]`** - **Detalles de Película**: Muestra la información detallada de una película seleccionada, incluyendo recomendaciones de películas similares basadas en el género o atributos relevantes. Además, puedes marcarla como favorita, pero para ello necesitas estar logueado.

6. **`/recommendations/?movieId=movieId`** - **Recomendaciones**: Muestra una lista de películas recomendadas en función del género de la película seleccionada mediante el parámetro movieId.
 


## Características Adicionales


- **Autenticación de Usuario**: Permite a los usuarios crear cuentas, iniciar sesión y guardar películas favoritas .
- **Modo Oscuro**: Implementa una función de modo oscuro que permita a los usuarios alternar entre temas claros y oscuros.
- **Recomendaciones de Películas**: Incorpora un motor de recomendaciones que sugiera películas basadas en el historial de visualización o preferencias del usuario.

- **Diseño Responsivo**: Asegúrate de que la aplicación sea completamente responsiva y funcione bien en varios dispositivos y tamaños de pantalla.
- **Integración con APIs Externas**: Tráilers de películas para mejorar la experiencia del usuario.
## Stack

- **Next.js**: Para construir la aplicación con SSR.
- **TypeScript**: Para seguridad de tipos.
- **Material o Tailwind UI**: Para la interfaz de usuario.
- **React Redux Toolkit**: Para la gestión del estado.
- **Axios**: Para realizar llamadas a la API.
- **ESLint con la configuración de Airbnb**: Para el análisis de código