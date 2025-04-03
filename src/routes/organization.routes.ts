import { Router } from 'express';
import { 
  getAllOrganizations, 
  getOrganizationById, 
  createOrganization, 
  updateOrganization, 
  deleteOrganization 
} from '../controllers/organization.controller';
import { 
  createOrganizationValidator, 
  updateOrganizationValidator, 
  getOrganizationValidator, 
  deleteOrganizationValidator 
} from '../middleware/validators/organization.validator';
import { validate } from '../middleware/validation';

const router = Router();

// GET /api/organizations - Get all organizations
router.get('/', getAllOrganizations);

// GET /api/organizations/:id - Get organization by ID
router.get('/:id', getOrganizationValidator, validate, getOrganizationById);

// POST /api/organizations - Create organization
router.post('/', createOrganizationValidator, validate, createOrganization);

// PUT /api/organizations/:id - Update organization
router.put('/:id', updateOrganizationValidator, validate, updateOrganization);

// DELETE /api/organizations/:id - Delete organization
router.delete('/:id', deleteOrganizationValidator, validate, deleteOrganization);

export default router; 