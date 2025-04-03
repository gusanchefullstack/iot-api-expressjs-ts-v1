import { body, param } from 'express-validator';

export const createOrganizationValidator = [
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
  
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
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