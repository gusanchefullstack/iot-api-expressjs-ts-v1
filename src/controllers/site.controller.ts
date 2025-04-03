import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/client';
import { SiteInput, SiteUpdateInput } from '../types/models';
import { ApiError } from '../middleware/error-handler';

// Get all sites
export const getAllSites = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sites = await prisma.site.findMany();
    
    res.status(200).json({
      success: true,
      data: sites
    });
  } catch (error) {
    next(error);
  }
};

// Get sites by organization ID
export const getSitesByOrganizationId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { organizationId } = req.params;
    
    // Verificar si la organización existe
    const organization = await prisma.organization.findUnique({
      where: { id: organizationId }
    });
    
    if (!organization) {
      const error = new Error('Organization not found') as ApiError;
      error.statusCode = 404;
      error.code = 'ORGANIZATION_NOT_FOUND';
      throw error;
    }
    
    const sites = await prisma.site.findMany({
      where: { organizationId }
    });
    
    res.status(200).json({
      success: true,
      data: sites
    });
  } catch (error) {
    next(error);
  }
};

// Get site by ID
export const getSiteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    const site = await prisma.site.findUnique({
      where: { id },
      include: { 
        organization: true,
        measuringPoints: true
      }
    });
    
    if (!site) {
      const error = new Error('Site not found') as ApiError;
      error.statusCode = 404;
      error.code = 'SITE_NOT_FOUND';
      throw error;
    }
    
    res.status(200).json({
      success: true,
      data: site
    });
  } catch (error) {
    next(error);
  }
};

// Create site
export const createSite = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const siteData: SiteInput = req.body;
    
    // Verificar si la organización existe
    const organization = await prisma.organization.findUnique({
      where: { id: siteData.organizationId }
    });
    
    if (!organization) {
      const error = new Error('Organization not found') as ApiError;
      error.statusCode = 404;
      error.code = 'ORGANIZATION_NOT_FOUND';
      throw error;
    }
    
    const newSite = await prisma.site.create({
      data: siteData
    });
    
    res.status(201).json({
      success: true,
      data: newSite
    });
  } catch (error) {
    next(error);
  }
};

// Update site
export const updateSite = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const siteData: SiteUpdateInput = req.body;
    
    // Verificar si el sitio existe
    const existingSite = await prisma.site.findUnique({
      where: { id }
    });
    
    if (!existingSite) {
      const error = new Error('Site not found') as ApiError;
      error.statusCode = 404;
      error.code = 'SITE_NOT_FOUND';
      throw error;
    }
    
    // Si se actualiza la organización, verificar que exista
    if (siteData.organizationId) {
      const organization = await prisma.organization.findUnique({
        where: { id: siteData.organizationId }
      });
      
      if (!organization) {
        const error = new Error('Organization not found') as ApiError;
        error.statusCode = 404;
        error.code = 'ORGANIZATION_NOT_FOUND';
        throw error;
      }
    }
    
    const updatedSite = await prisma.site.update({
      where: { id },
      data: siteData
    });
    
    res.status(200).json({
      success: true,
      data: updatedSite
    });
  } catch (error) {
    next(error);
  }
};

// Delete site
export const deleteSite = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    // Verificar si el sitio existe
    const existingSite = await prisma.site.findUnique({
      where: { id }
    });
    
    if (!existingSite) {
      const error = new Error('Site not found') as ApiError;
      error.statusCode = 404;
      error.code = 'SITE_NOT_FOUND';
      throw error;
    }
    
    await prisma.site.delete({
      where: { id }
    });
    
    res.status(200).json({
      success: true,
      message: 'Site deleted successfully'
    });
  } catch (error) {
    next(error);
  }
}; 