import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/client';
import { MeasuringPointInput, MeasuringPointUpdateInput } from '../types/models';
import { ApiError } from '../middleware/error-handler';

// Get all measuring points
export const getAllMeasuringPoints = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const measuringPoints = await prisma.measuringPoint.findMany();
    
    res.status(200).json({
      success: true,
      data: measuringPoints
    });
  } catch (error) {
    next(error);
  }
};

// Get measuring points by site ID
export const getMeasuringPointsBySiteId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { siteId } = req.params;
    
    // Verificar si el sitio existe
    const site = await prisma.site.findUnique({
      where: { id: siteId }
    });
    
    if (!site) {
      const error = new Error('Site not found') as ApiError;
      error.statusCode = 404;
      error.code = 'SITE_NOT_FOUND';
      throw error;
    }
    
    const measuringPoints = await prisma.measuringPoint.findMany({
      where: { siteId }
    });
    
    res.status(200).json({
      success: true,
      data: measuringPoints
    });
  } catch (error) {
    next(error);
  }
};

// Get measuring point by ID
export const getMeasuringPointById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    const measuringPoint = await prisma.measuringPoint.findUnique({
      where: { id },
      include: { 
        site: true,
        boards: true
      }
    });
    
    if (!measuringPoint) {
      const error = new Error('Measuring point not found') as ApiError;
      error.statusCode = 404;
      error.code = 'MEASURING_POINT_NOT_FOUND';
      throw error;
    }
    
    res.status(200).json({
      success: true,
      data: measuringPoint
    });
  } catch (error) {
    next(error);
  }
};

// Create measuring point
export const createMeasuringPoint = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const measuringPointData: MeasuringPointInput = req.body;
    
    // Verificar si el sitio existe
    const site = await prisma.site.findUnique({
      where: { id: measuringPointData.siteId }
    });
    
    if (!site) {
      const error = new Error('Site not found') as ApiError;
      error.statusCode = 404;
      error.code = 'SITE_NOT_FOUND';
      throw error;
    }
    
    const newMeasuringPoint = await prisma.measuringPoint.create({
      data: measuringPointData
    });
    
    res.status(201).json({
      success: true,
      data: newMeasuringPoint
    });
  } catch (error) {
    next(error);
  }
};

// Update measuring point
export const updateMeasuringPoint = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const measuringPointData: MeasuringPointUpdateInput = req.body;
    
    // Verificar si el punto de medición existe
    const existingMeasuringPoint = await prisma.measuringPoint.findUnique({
      where: { id }
    });
    
    if (!existingMeasuringPoint) {
      const error = new Error('Measuring point not found') as ApiError;
      error.statusCode = 404;
      error.code = 'MEASURING_POINT_NOT_FOUND';
      throw error;
    }
    
    // Si se actualiza el sitio, verificar que exista
    if (measuringPointData.siteId) {
      const site = await prisma.site.findUnique({
        where: { id: measuringPointData.siteId }
      });
      
      if (!site) {
        const error = new Error('Site not found') as ApiError;
        error.statusCode = 404;
        error.code = 'SITE_NOT_FOUND';
        throw error;
      }
    }
    
    const updatedMeasuringPoint = await prisma.measuringPoint.update({
      where: { id },
      data: measuringPointData
    });
    
    res.status(200).json({
      success: true,
      data: updatedMeasuringPoint
    });
  } catch (error) {
    next(error);
  }
};

// Delete measuring point
export const deleteMeasuringPoint = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    // Verificar si el punto de medición existe
    const existingMeasuringPoint = await prisma.measuringPoint.findUnique({
      where: { id }
    });
    
    if (!existingMeasuringPoint) {
      const error = new Error('Measuring point not found') as ApiError;
      error.statusCode = 404;
      error.code = 'MEASURING_POINT_NOT_FOUND';
      throw error;
    }
    
    await prisma.measuringPoint.delete({
      where: { id }
    });
    
    res.status(200).json({
      success: true,
      message: 'Measuring point deleted successfully'
    });
  } catch (error) {
    next(error);
  }
}; 