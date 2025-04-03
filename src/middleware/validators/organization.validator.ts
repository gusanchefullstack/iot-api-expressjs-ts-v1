import { body, param } from 'express-validator';

export const createOrganizationValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .trim(),
  
  body('country')
    .notEmpty()
    .withMessage('Country is required')
    .isString()
    .withMessage('Country must be a string')
    .isLength({ min: 3, max: 100 })
    .withMessage('Country must be between 3 and 100 characters')
    .trim(),
  
  body('state')
    .notEmpty()
    .withMessage('State is required')
    .isString()
    .withMessage('State must be a string')
    .isLength({ min: 3, max: 100 })
    .withMessage('State must be between 3 and 100 characters')
    .trim(),
  
  body('city')
    .notEmpty()
    .withMessage('City is required')
    .isString()
    .withMessage('City must be a string')
    .isLength({ min: 3, max: 100 })
    .withMessage('City must be between 3 and 100 characters')
    .trim(),
  
  body('address')
    .notEmpty()
    .withMessage('Address is required')
    .isString()
    .withMessage('Address must be a string')
    .isLength({ min: 3, max: 100 })
    .withMessage('Address must be between 3 and 100 characters')
    .trim(),
  
  body('zipcode')
    .notEmpty()
    .withMessage('Zipcode is required')
    .isString()
    .withMessage('Zipcode must be a string')
    .isLength({ min: 3, max: 100 })
    .withMessage('Zipcode must be between 3 and 100 characters')
    .trim()
];

export const updateOrganizationValidator = [
  param('id')
    .notEmpty()
    .withMessage('Organization ID is required')
    .isMongoId()
    .withMessage('Invalid organization ID format'),
  
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .trim(),
  
  body('country')
    .optional()
    .isString()
    .withMessage('Country must be a string')
    .isLength({ min: 3, max: 100 })
    .withMessage('Country must be between 3 and 100 characters')
    .trim(),
  
  body('state')
    .optional()
    .isString()
    .withMessage('State must be a string')
    .isLength({ min: 3, max: 100 })
    .withMessage('State must be between 3 and 100 characters')
    .trim(),
  
  body('city')
    .optional()
    .isString()
    .withMessage('City must be a string')
    .isLength({ min: 3, max: 100 })
    .withMessage('City must be between 3 and 100 characters')
    .trim(),
  
  body('address')
    .optional()
    .isString()
    .withMessage('Address must be a string')
    .isLength({ min: 3, max: 100 })
    .withMessage('Address must be between 3 and 100 characters')
    .trim(),
  
  body('zipcode')
    .optional()
    .isString()
    .withMessage('Zipcode must be a string')
    .isLength({ min: 3, max: 100 })
    .withMessage('Zipcode must be between 3 and 100 characters')
    .trim()
];

export const getOrganizationValidator = [
  param('id')
    .notEmpty()
    .withMessage('Organization ID is required')
    .isMongoId()
    .withMessage('Invalid organization ID format')
];

export const deleteOrganizationValidator = [
  param('id')
    .notEmpty()
    .withMessage('Organization ID is required')
    .isMongoId()
    .withMessage('Invalid organization ID format')
]; 