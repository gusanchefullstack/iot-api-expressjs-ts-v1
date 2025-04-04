import { body, param } from 'express-validator';
import { BoardStatus } from '../../types/models';

export const createBoardValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .trim(),
  
  body('serialNumber')
    .optional()
    .isString()
    .withMessage('Serial number must be a string')
    .trim(),
  
  body('model')
    .optional()
    .isString()
    .withMessage('Model must be a string')
    .trim(),
  
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .trim(),
  
  body('boardStatus')
    .notEmpty()
    .withMessage('Board status is required')
    .isIn(Object.values(BoardStatus))
    .withMessage('Invalid board status. Must be one of: ' + Object.values(BoardStatus).join(', ')),
  
  body('measuringPointId')
    .notEmpty()
    .withMessage('Measuring point ID is required')
    .isMongoId()
    .withMessage('Invalid measuring point ID format')
];

export const updateBoardValidator = [
  param('id')
    .notEmpty()
    .withMessage('Board ID is required')
    .isMongoId()
    .withMessage('Invalid board ID format'),
  
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .trim(),
  
  body('serialNumber')
    .optional()
    .isString()
    .withMessage('Serial number must be a string')
    .trim(),
  
  body('model')
    .optional()
    .isString()
    .withMessage('Model must be a string')
    .trim(),
  
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .trim(),
  
  body('boardStatus')
    .optional()
    .isIn(Object.values(BoardStatus))
    .withMessage('Invalid board status. Must be one of: ' + Object.values(BoardStatus).join(', ')),
  
  body('measuringPointId')
    .optional()
    .isMongoId()
    .withMessage('Invalid measuring point ID format')
];

export const getBoardValidator = [
  param('id')
    .notEmpty()
    .withMessage('Board ID is required')
    .isMongoId()
    .withMessage('Invalid board ID format')
];

export const getBoardsByMeasuringPointValidator = [
  param('measuringPointId')
    .notEmpty()
    .withMessage('Measuring point ID is required')
    .isMongoId()
    .withMessage('Invalid measuring point ID format')
];

export const deleteBoardValidator = [
  param('id')
    .notEmpty()
    .withMessage('Board ID is required')
    .isMongoId()
    .withMessage('Invalid board ID format')
];