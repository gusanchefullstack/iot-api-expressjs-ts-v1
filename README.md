# API para Dispositivos IoT

API RESTful para gestionar una jerarquía de dispositivos IoT con la siguiente estructura:

```
Organization -> Site -> Measuring Point -> Board -> Sensor
```

## Estructura de la jerarquía

- **Organization**: Representa una organización o empresa que posee uno o más sitios.
- **Site**: Representa una ubicación física (ej. edificio, planta industrial) que pertenece a una organización.
- **Measuring Point**: Representa un punto de medición específico dentro de un sitio.
- **Board**: Representa una placa o dispositivo electrónico ubicado en un punto de medición.
- **Sensor**: Representa un sensor individual conectado a una placa.

## Requisitos

- Node.js 18+
- MongoDB Atlas (o MongoDB local)
- npm o yarn

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd iot-api-expressjs-ts-v1
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   ```bash
   cp .env.example .env
   # Editar el archivo .env con tus propias configuraciones
   ```

4. Generar el cliente de Prisma:
   ```bash
   npm run prisma:generate
   ```

5. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Uso

La API estará disponible en `http://localhost:3000/api/`.

## Endpoints

### Organizations

- `GET /api/organizations` - Obtener todas las organizaciones
- `GET /api/organizations/:id` - Obtener una organización por ID
- `POST /api/organizations` - Crear una organización
- `PUT /api/organizations/:id` - Actualizar una organización
- `DELETE /api/organizations/:id` - Eliminar una organización

### Sites

- `GET /api/sites` - Obtener todos los sitios
- `GET /api/sites/:id` - Obtener un sitio por ID
- `GET /api/sites/organization/:organizationId` - Obtener sitios por ID de organización
- `POST /api/sites` - Crear un sitio
- `PUT /api/sites/:id` - Actualizar un sitio
- `DELETE /api/sites/:id` - Eliminar un sitio

### Measuring Points

- `GET /api/measuring-points` - Obtener todos los puntos de medición
- `GET /api/measuring-points/:id` - Obtener un punto de medición por ID
- `GET /api/measuring-points/site/:siteId` - Obtener puntos de medición por ID de sitio
- `POST /api/measuring-points` - Crear un punto de medición
- `PUT /api/measuring-points/:id` - Actualizar un punto de medición
- `DELETE /api/measuring-points/:id` - Eliminar un punto de medición

### Boards

- `GET /api/boards` - Obtener todas las placas
- `GET /api/boards/:id` - Obtener una placa por ID
- `GET /api/boards/measuring-point/:measuringPointId` - Obtener placas por ID de punto de medición
- `POST /api/boards` - Crear una placa
- `PUT /api/boards/:id` - Actualizar una placa
- `DELETE /api/boards/:id` - Eliminar una placa

### Sensors

- `GET /api/sensors` - Obtener todos los sensores
- `GET /api/sensors/:id` - Obtener un sensor por ID
- `GET /api/sensors/board/:boardId` - Obtener sensores por ID de placa
- `POST /api/sensors` - Crear un sensor
- `PUT /api/sensors/:id` - Actualizar un sensor
- `DELETE /api/sensors/:id` - Eliminar un sensor

## Scripts disponibles

- `npm run build` - Compilar el proyecto TypeScript
- `npm start` - Iniciar el servidor en producción
- `npm run dev` - Iniciar el servidor en modo desarrollo con hot-reload
- `npm run prisma:generate` - Generar el cliente de Prisma
- `npm run prisma:studio` - Iniciar Prisma Studio para gestionar la base de datos

## Tecnologías utilizadas

- TypeScript
- Node.js
- Express.js
- Prisma ORM
- MongoDB
- Express Validator
- Swagger UI Express (documentación)

## Licencia

ISC 