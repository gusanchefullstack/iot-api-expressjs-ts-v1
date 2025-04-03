import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/client';
import { OrganizationInput, OrganizationUpdateInput } from '../types/models';
import { ApiError } from '../middleware/error-handler';

// Get all organizations
export const getAllOrganizations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const organizations = await prisma.organization.findMany();
    
    res.status(200).json({
      success: true,
      data: organizations
    });
  } catch (error) {
    next(error);
  }
};

// Get organization by ID
export const getOrganizationById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    const organization = await prisma.organization.findUnique({
      where: { id },
      include: { sites: true }
    });
    
    if (!organization) {
      const error = new Error('Organization not found') as ApiError;
      error.statusCode = 404;
      error.code = 'ORGANIZATION_NOT_FOUND';
      throw error;
    }
    
    res.status(200).json({
      success: true,
      data: organization
    });
  } catch (error) {
    next(error);
  }
};

// Create organization
export const createOrganization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const organizationData: OrganizationInput = req.body;
    
    const newOrganization = await prisma.organization.create({
      data: organizationData
    });
    
    res.status(201).json({
      success: true,
      data: newOrganization
    });
  } catch (error) {
    next(error);
  }
};

// Update organization
export const updateOrganization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const organizationData: OrganizationUpdateInput = req.body;
    
    // Verificar si la organización existe
    const existingOrganization = await prisma.organization.findUnique({
      where: { id }
    });
    
    if (!existingOrganization) {
      const error = new Error('Organization not found') as ApiError;
      error.statusCode = 404;
      error.code = 'ORGANIZATION_NOT_FOUND';
      throw error;
    }
    
    const updatedOrganization = await prisma.organization.update({
      where: { id },
      data: organizationData
    });
    
    res.status(200).json({
      success: true,
      data: updatedOrganization
    });
  } catch (error) {
    next(error);
  }
};

// Delete organization
export const deleteOrganization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    // Verificar si la organización existe
    const existingOrganization = await prisma.organization.findUnique({
      where: { id }
    });
    
    if (!existingOrganization) {
      const error = new Error('Organization not found') as ApiError;
      error.statusCode = 404;
      error.code = 'ORGANIZATION_NOT_FOUND';
      throw error;
    }
    
    await prisma.organization.delete({
      where: { id }
    });
    
    res.status(200).json({
      success: true,
      message: 'Organization deleted successfully'
    });
  } catch (error) {
    next(error);
  }
}; 