import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

// Custom interface for extended request
interface AuthRequest extends Request {
  user?: any;
}

// Submit contact form
export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message, eventDate, eventType } = req.body;

    // Create contact message
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
        eventDate: eventDate ? new Date(eventDate) : null,
        eventType
      }
    });

    res.status(201).json({
      success: true,
      data: contactMessage
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all contact messages (admin only)
export const getContactMessages = async (req: AuthRequest, res: Response) => {
  try {
    const { status, page = '1', limit = '10' } = req.query;
    
    // Parse pagination params
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;
    
    // Build where clause for filtering
    let whereClause: any = {};
    
    if (status) {
      whereClause.status = status;
    }
    
    // Get contact messages with count
    const [messages, total] = await Promise.all([
      prisma.contactMessage.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum
      }),
      prisma.contactMessage.count({ where: whereClause })
    ]);
    
    res.status(200).json({
      success: true,
      count: messages.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: messages
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get single contact message (admin only)
export const getContactMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    const message = await prisma.contactMessage.findUnique({
      where: { id }
    });
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: message
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update contact message status (admin only)
export const updateContactMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const message = await prisma.contactMessage.findUnique({
      where: { id }
    });
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    
    const updatedMessage = await prisma.contactMessage.update({
      where: { id },
      data: { status }
    });
    
    res.status(200).json({
      success: true,
      data: updatedMessage
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete contact message (admin only)
export const deleteContactMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    const message = await prisma.contactMessage.findUnique({
      where: { id }
    });
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    
    await prisma.contactMessage.delete({
      where: { id }
    });
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};