import { Request, Response } from 'express';
import Nifty from '../../models/nifty';

const createNifty = async (req: Request, res: Response) => {
  try {
    const { name, cmp, pointChange, lastPoint, userId } = req.body;
    const ownerId = (req as any).user?._id ?? userId;
    const newNifty = new Nifty({ name, cmp, pointChange, lastPoint, user: ownerId, userId: ownerId });
    await newNifty.save();
    res.status(201).json(newNifty);
  } catch (error) {
    console.error('Error creating Nifty:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default createNifty;
