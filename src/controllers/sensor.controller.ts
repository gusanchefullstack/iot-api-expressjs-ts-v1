import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/client';
import { SensorInput, SensorUpdateInput } from '../types/models';
import { ApiError } from '../middleware/error-handler';

// Get all sensors
export const getAllSensors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sensors = await prisma.sensor.findMany();
    
    res.status(200).json({
      success: true,
      data: sensors
    });
  } catch (error) {
    next(error);
  }
};

// Get sensors by board ID
export const getSensorsByBoardId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { boardId } = req.params;
    
    // Verificar si la placa existe
    const board = await prisma.board.findUnique({
      where: { id: boardId }
    });
    
    if (!board) {
      const error = new Error('Board not found') as ApiError;
      error.statusCode = 404;
      error.code = 'BOARD_NOT_FOUND';
      throw error;
    }
    
    const sensors = await prisma.sensor.findMany({
      where: { boardId }
    });
    
    res.status(200).json({
      success: true,
      data: sensors
    });
  } catch (error) {
    next(error);
  }
};

// Get sensor by ID
export const getSensorById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    const sensor = await prisma.sensor.findUnique({
      where: { id },
      include: { board: true }
    });
    
    if (!sensor) {
      const error = new Error('Sensor not found') as ApiError;
      error.statusCode = 404;
      error.code = 'SENSOR_NOT_FOUND';
      throw error;
    }
    
    res.status(200).json({
      success: true,
      data: sensor
    });
  } catch (error) {
    next(error);
  }
};

// Create sensor
export const createSensor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sensorData: SensorInput = req.body;
    
    // Verificar si la placa existe
    const board = await prisma.board.findUnique({
      where: { id: sensorData.boardId }
    });
    
    if (!board) {
      const error = new Error('Board not found') as ApiError;
      error.statusCode = 404;
      error.code = 'BOARD_NOT_FOUND';
      throw error;
    }
    
    const newSensor = await prisma.sensor.create({
      data: sensorData
    });
    
    res.status(201).json({
      success: true,
      data: newSensor
    });
  } catch (error) {
    next(error);
  }
};

// Update sensor
export const updateSensor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const sensorData: SensorUpdateInput = req.body;
    
    // Verificar si el sensor existe
    const existingSensor = await prisma.sensor.findUnique({
      where: { id }
    });
    
    if (!existingSensor) {
      const error = new Error('Sensor not found') as ApiError;
      error.statusCode = 404;
      error.code = 'SENSOR_NOT_FOUND';
      throw error;
    }
    
    // Si se actualiza la placa, verificar que exista
    if (sensorData.boardId) {
      const board = await prisma.board.findUnique({
        where: { id: sensorData.boardId }
      });
      
      if (!board) {
        const error = new Error('Board not found') as ApiError;
        error.statusCode = 404;
        error.code = 'BOARD_NOT_FOUND';
        throw error;
      }
    }
    
    const updatedSensor = await prisma.sensor.update({
      where: { id },
      data: sensorData
    });
    
    res.status(200).json({
      success: true,
      data: updatedSensor
    });
  } catch (error) {
    next(error);
  }
};

// Delete sensor
export const deleteSensor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    // Verificar si el sensor existe
    const existingSensor = await prisma.sensor.findUnique({
      where: { id }
    });
    
    if (!existingSensor) {
      const error = new Error('Sensor not found') as ApiError;
      error.statusCode = 404;
      error.code = 'SENSOR_NOT_FOUND';
      throw error;
    }
    
    await prisma.sensor.delete({
      where: { id }
    });
    
    res.status(200).json({
      success: true,
      message: 'Sensor deleted successfully'
    });
  } catch (error) {
    next(error);
  }
}; 