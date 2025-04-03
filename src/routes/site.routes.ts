import { Router } from 'express';
import { 
  getAllSites, 
  getSiteById, 
  getSitesByOrganizationId,
  createSite, 
  updateSite, 
  deleteSite 
} from '../controllers/site.controller';
import { 
  createSiteValidator, 
  updateSiteValidator, 
  getSiteValidator,
  getSitesByOrganizationValidator,
  deleteSiteValidator 
} from '../middleware/validators/site.validator';
import { validate } from '../middleware/validation';

const router = Router();

// GET /api/sites - Get all sites
router.get('/', getAllSites);

// GET /api/sites/:id - Get site by ID
router.get('/:id', getSiteValidator, validate, getSiteById);

// GET /api/sites/organization/:organizationId - Get sites by organization ID
router.get('/organization/:organizationId', getSitesByOrganizationValidator, validate, getSitesByOrganizationId);

// POST /api/sites - Create site
router.post('/', createSiteValidator, validate, createSite);

// PUT /api/sites/:id - Update site
router.put('/:id', updateSiteValidator, validate, updateSite);

// DELETE /api/sites/:id - Delete site
router.delete('/:id', deleteSiteValidator, validate, deleteSite);

export default router; 