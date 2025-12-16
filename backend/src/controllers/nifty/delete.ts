import { Request, Response } from 'express';
import Nifty from '../../models/nifty';
import mongoose from 'mongoose';

const deleteNifty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid nifty id' });
    }
    const deleted = await Nifty.findByIdAndDelete(id).lean();
    res.status(200).json(deleted);
  } catch (error) {
    console.error('Error deleting nifty:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default deleteNifty;
