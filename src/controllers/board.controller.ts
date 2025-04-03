import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/client';
import { BoardInput, BoardUpdateInput } from '../types/models';
import { ApiError } from '../middleware/error-handler';

// Get all boards
export const getAllBoards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const boards = await prisma.board.findMany();
    
    res.status(200).json({
      success: true,
      data: boards
    });
  } catch (error) {
    next(error);
  }
};

// Get boards by measuring point ID
export const getBoardsByMeasuringPointId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { measuringPointId } = req.params;
    
    // Verificar si el punto de medición existe
    const measuringPoint = await prisma.measuringPoint.findUnique({
      where: { id: measuringPointId }
    });
    
    if (!measuringPoint) {
      const error = new Error('Measuring point not found') as ApiError;
      error.statusCode = 404;
      error.code = 'MEASURING_POINT_NOT_FOUND';
      throw error;
    }
    
    const boards = await prisma.board.findMany({
      where: { measuringPointId }
    });
    
    res.status(200).json({
      success: true,
      data: boards
    });
  } catch (error) {
    next(error);
  }
};

// Get board by ID
export const getBoardById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    const board = await prisma.board.findUnique({
      where: { id },
      include: { 
        measuringPoint: true,
        sensors: true
      }
    });
    
    if (!board) {
      const error = new Error('Board not found') as ApiError;
      error.statusCode = 404;
      error.code = 'BOARD_NOT_FOUND';
      throw error;
    }
    
    res.status(200).json({
      success: true,
      data: board
    });
  } catch (error) {
    next(error);
  }
};

// Create board
export const createBoard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const boardData: BoardInput = req.body;
    
    // Verificar si el punto de medición existe
    const measuringPoint = await prisma.measuringPoint.findUnique({
      where: { id: boardData.measuringPointId }
    });
    
    if (!measuringPoint) {
      const error = new Error('Measuring point not found') as ApiError;
      error.statusCode = 404;
      error.code = 'MEASURING_POINT_NOT_FOUND';
      throw error;
    }
    
    const newBoard = await prisma.board.create({
      data: boardData
    });
    
    res.status(201).json({
      success: true,
      data: newBoard
    });
  } catch (error) {
    next(error);
  }
};

// Update board
export const updateBoard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const boardData: BoardUpdateInput = req.body;
    
    // Verificar si la placa existe
    const existingBoard = await prisma.board.findUnique({
      where: { id }
    });
    
    if (!existingBoard) {
      const error = new Error('Board not found') as ApiError;
      error.statusCode = 404;
      error.code = 'BOARD_NOT_FOUND';
      throw error;
    }
    
    // Si se actualiza el punto de medición, verificar que exista
    if (boardData.measuringPointId) {
      const measuringPoint = await prisma.measuringPoint.findUnique({
        where: { id: boardData.measuringPointId }
      });
      
      if (!measuringPoint) {
        const error = new Error('Measuring point not found') as ApiError;
        error.statusCode = 404;
        error.code = 'MEASURING_POINT_NOT_FOUND';
        throw error;
      }
    }
    
    const updatedBoard = await prisma.board.update({
      where: { id },
      data: boardData
    });
    
    res.status(200).json({
      success: true,
      data: updatedBoard
    });
  } catch (error) {
    next(error);
  }
};

// Delete board
export const deleteBoard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    // Verificar si la placa existe
    const existingBoard = await prisma.board.findUnique({
      where: { id }
    });
    
    if (!existingBoard) {
      const error = new Error('Board not found') as ApiError;
      error.statusCode = 404;
      error.code = 'BOARD_NOT_FOUND';
      throw error;
    }
    
    await prisma.board.delete({
      where: { id }
    });
    
    res.status(200).json({
      success: true,
      message: 'Board deleted successfully'
    });
  } catch (error) {
    next(error);
  }
}; 