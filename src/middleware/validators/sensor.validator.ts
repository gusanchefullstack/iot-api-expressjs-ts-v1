import { body, param } from 'express-validator';

export const createSensorValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .trim(),
  
  body('type')
    .notEmpty()
    .withMessage('Type is required')
    .isString()
    .withMessage('Type must be a string')
    .trim(),
  
  body('unit')
    .optional()
    .isString()
    .withMessage('Unit must be a string')
    .trim(),
  
  body('model')
    .optional()
    .isString()
    .withMessage('Model must be a string')
    .trim(),
  
  body('serialNumber')
    .optional()
    .isString()
    .withMessage('Serial number must be a string')
    .trim(),
  
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .trim(),
  
  body('boardId')
    .notEmpty()
    .withMessage('Board ID is required')
    .isMongoId()
    .withMessage('Invalid board ID format')
];

export const updateSensorValidator = [
  param('id')
    .notEmpty()
    .withMessage('Sensor ID is required')
    .isMongoId()
    .withMessage('Invalid sensor ID format'),
  
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .trim(),
  
  body('type')
    .optional()
    .isString()
    .withMessage('Type must be a string')
    .trim(),
  
  body('unit')
    .optional()
    .isString()
    .withMessage('Unit must be a string')
    .trim(),
  
  body('model')
    .optional()
    .isString()
    .withMessage('Model must be a string')
    .trim(),
  
  body('serialNumber')
    .optional()
    .isString()
    .withMessage('Serial number must be a string')
    .trim(),
  
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .trim(),
  
  body('boardId')
    .optional()
    .isMongoId()
    .withMessage('Invalid board ID format')
];

export const getSensorValidator = [
  param('id')
    .notEmpty()
    .withMessage('Sensor ID is required')
    .isMongoId()
    .withMessage('Invalid sensor ID format')
];

export const getSensorsByBoardValidator = [
  param('boardId')
    .notEmpty()
    .withMessage('Board ID is required')
    .isMongoId()
    .withMessage('Invalid board ID format')
];

export const deleteSensorValidator = [
  param('id')
    .notEmpty()
    .withMessage('Sensor ID is required')
    .isMongoId()
    .withMessage('Invalid sensor ID format')
]; 