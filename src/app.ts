import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import { errorHandler } from './middleware/error-handler';
import config from './config/config';

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api', routes);

// Ruta de bienvenida
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to the IoT Devices API',
    documentation: '/api-docs'
  });
});

// Manejo de rutas no encontradas
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.originalUrl} not found`
    }
  });
});

// Middleware de manejo de errores
app.use(errorHandler);

export default app; 