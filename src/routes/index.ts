import { Router } from 'express';
import organizationRoutes from './organization.routes';
import siteRoutes from './site.routes';
import measuringPointRoutes from './measuring-point.routes';
import boardRoutes from './board.routes';
import sensorRoutes from './sensor.routes';

const router = Router();

// Registrar las rutas
router.use('/organizations', organizationRoutes);
router.use('/sites', siteRoutes);
router.use('/measuring-points', measuringPointRoutes);
router.use('/boards', boardRoutes);
router.use('/sensors', sensorRoutes);

export default router;