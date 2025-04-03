import { body, param } from 'express-validator';

export const createMeasuringPointValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .trim(),
  
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .trim(),
  
  body('coordinates')
    .optional()
    .isString()
    .withMessage('Coordinates must be a string')
    .trim(),
  
  body('siteId')
    .notEmpty()
    .withMessage('Site ID is required')
    .isMongoId()
    .withMessage('Invalid site ID format')
];

export const updateMeasuringPointValidator = [
  param('id')
    .notEmpty()
    .withMessage('Measuring point ID is required')
    .isMongoId()
    .withMessage('Invalid measuring point ID format'),
  
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .trim(),
  
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .trim(),
  
  body('coordinates')
    .optional()
    .isString()
    .withMessage('Coordinates must be a string')
    .trim(),
  
  body('siteId')
    .optional()
    .isMongoId()
    .withMessage('Invalid site ID format')
];

export const getMeasuringPointValidator = [
  param('id')
    .notEmpty()
    .withMessage('Measuring point ID is required')
    .isMongoId()
    .withMessage('Invalid measuring point ID format')
];

export const getMeasuringPointsBySiteValidator = [
  param('siteId')
    .notEmpty()
    .withMessage('Site ID is required')
    .isMongoId()
    .withMessage('Invalid site ID format')
];

export const deleteMeasuringPointValidator = [
  param('id')
    .notEmpty()
    .withMessage('Measuring point ID is required')
    .isMongoId()
    .withMessage('Invalid measuring point ID format')
]; 