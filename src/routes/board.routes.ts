import { Router } from 'express';
import { 
  getAllBoards, 
  getBoardById, 
  getBoardsByMeasuringPointId,
  createBoard, 
  updateBoard, 
  deleteBoard 
} from '../controllers/board.controller';
import { 
  createBoardValidator, 
  updateBoardValidator, 
  getBoardValidator,
  getBoardsByMeasuringPointValidator,
  deleteBoardValidator 
} from '../middleware/validators/board.validator';
import { validate } from '../middleware/validation';

const router = Router();

// GET /api/boards - Get all boards
router.get('/', getAllBoards);

// GET /api/boards/:id - Get board by ID
router.get('/:id', getBoardValidator, validate, getBoardById);

// GET /api/boards/measuring-point/:measuringPointId - Get boards by measuring point ID
router.get('/measuring-point/:measuringPointId', getBoardsByMeasuringPointValidator, validate, getBoardsByMeasuringPointId);

// POST /api/boards - Create board
router.post('/', createBoardValidator, validate, createBoard);

// PUT /api/boards/:id - Update board
router.put('/:id', updateBoardValidator, validate, updateBoard);

// DELETE /api/boards/:id - Delete board
router.delete('/:id', deleteBoardValidator, validate, deleteBoard);

export default router; 