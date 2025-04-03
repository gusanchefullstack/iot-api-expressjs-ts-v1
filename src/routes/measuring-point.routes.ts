import { Router } from 'express';
import { 
  getAllMeasuringPoints, 
  getMeasuringPointById, 
  getMeasuringPointsBySiteId,
  createMeasuringPoint, 
  updateMeasuringPoint, 
  deleteMeasuringPoint 
} from '../controllers/measuring-point.controller';
import { 
  createMeasuringPointValidator, 
  updateMeasuringPointValidator, 
  getMeasuringPointValidator,
  getMeasuringPointsBySiteValidator,
  deleteMeasuringPointValidator 
} from '../middleware/validators/measuring-point.validator';
import { validate } from '../middleware/validation';

const router = Router();

// GET /api/measuring-points - Get all measuring points
router.get('/', getAllMeasuringPoints);

// GET /api/measuring-points/:id - Get measuring point by ID
router.get('/:id', getMeasuringPointValidator, validate, getMeasuringPointById);

// GET /api/measuring-points/site/:siteId - Get measuring points by site ID
router.get('/site/:siteId', getMeasuringPointsBySiteValidator, validate, getMeasuringPointsBySiteId);

// POST /api/measuring-points - Create measuring point
router.post('/', createMeasuringPointValidator, validate, createMeasuringPoint);

// PUT /api/measuring-points/:id - Update measuring point
router.put('/:id', updateMeasuringPointValidator, validate, updateMeasuringPoint);

// DELETE /api/measuring-points/:id - Delete measuring point
router.delete('/:id', deleteMeasuringPointValidator, validate, deleteMeasuringPoint);

export default router; 