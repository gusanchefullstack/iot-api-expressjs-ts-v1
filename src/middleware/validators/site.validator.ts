import { body, param } from 'express-validator';

export const createSiteValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .trim(),
  
  body('location')
    .optional()
    .isString()
    .withMessage('Location must be a string')
    .trim(),
  
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .trim(),
  
  body('organizationId')
    .notEmpty()
    .withMessage('Organization ID is required')
    .isMongoId()
    .withMessage('Invalid organization ID format')
];

export const updateSiteValidator = [
  param('id')
    .notEmpty()
    .withMessage('Site ID is required')
    .isMongoId()
    .withMessage('Invalid site ID format'),
  
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .trim(),
  
  body('location')
    .optional()
    .isString()
    .withMessage('Location must be a string')
    .trim(),
  
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .trim(),
  
  body('organizationId')
    .optional()
    .isMongoId()
    .withMessage('Invalid organization ID format')
];

export const getSiteValidator = [
  param('id')
    .notEmpty()
    .withMessage('Site ID is required')
    .isMongoId()
    .withMessage('Invalid site ID format')
];

export const getSitesByOrganizationValidator = [
  param('organizationId')
    .notEmpty()
    .withMessage('Organization ID is required')
    .isMongoId()
    .withMessage('Invalid organization ID format')
];

export const deleteSiteValidator = [
  param('id')
    .notEmpty()
    .withMessage('Site ID is required')
    .isMongoId()
    .withMessage('Invalid site ID format')
]; 