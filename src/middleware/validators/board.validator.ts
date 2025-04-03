import { body, param } from 'express-validator';

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