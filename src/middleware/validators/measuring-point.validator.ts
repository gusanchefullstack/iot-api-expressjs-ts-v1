import { body, param } from 'express-validator';

export const createMeasuringPointValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .trim(),
  
  body('latitude')
    .notEmpty()
    .withMessage('Latitude is required')
    .isFloat()
    .withMessage('Latitude must be a number')
    .custom(value => {
      if (value < -90 || value > 90) {
        throw new Error('Latitude must be between -90 and 90');
      }
      return true;
    }),
  
  body('longitude')
    .notEmpty()
    .withMessage('Longitude is required')
    .isFloat()
    .withMessage('Longitude must be a number')
    .custom(value => {
      if (value < -180 || value > 180) {
        throw new Error('Longitude must be between -180 and 180');
      }
      return true;
    }),
  
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
  
  body('latitude')
    .optional()
    .isFloat()
    .withMessage('Latitude must be a number')
    .custom(value => {
      if (value < -90 || value > 90) {
        throw new Error('Latitude must be between -90 and 90');
      }
      return true;
    }),
  
  body('longitude')
    .optional()
    .isFloat()
    .withMessage('Longitude must be a number')
    .custom(value => {
      if (value < -180 || value > 180) {
        throw new Error('Longitude must be between -180 and 180');
      }
      return true;
    }),
  
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