import { Router } from 'express';
import { 
  getAllSensors, 
  getSensorById, 
  getSensorsByBoardId,
  createSensor, 
  updateSensor, 
  deleteSensor 
} from '../controllers/sensor.controller';
import { 
  createSensorValidator, 
  updateSensorValidator, 
  getSensorValidator,
  getSensorsByBoardValidator,
  deleteSensorValidator 
} from '../middleware/validators/sensor.validator';
import { validate } from '../middleware/validation';

const router = Router();

// GET /api/sensors - Get all sensors
router.get('/', getAllSensors);

// GET /api/sensors/:id - Get sensor by ID
router.get('/:id', getSensorValidator, validate, getSensorById);

// GET /api/sensors/board/:boardId - Get sensors by board ID
router.get('/board/:boardId', getSensorsByBoardValidator, validate, getSensorsByBoardId);

// POST /api/sensors - Create sensor
router.post('/', createSensorValidator, validate, createSensor);

// PUT /api/sensors/:id - Update sensor
router.put('/:id', updateSensorValidator, validate, updateSensor);

// DELETE /api/sensors/:id - Delete sensor
router.delete('/:id', deleteSensorValidator, validate, deleteSensor);

export default router; 