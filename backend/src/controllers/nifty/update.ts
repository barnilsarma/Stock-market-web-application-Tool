import { Request, Response } from 'express';
import Nifty from '../../models/nifty';
import mongoose from 'mongoose';

const updateNifty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid nifty id' });
    }
    const { name, cmp, pointChange, lastPoint } = req.body;
    const updated = await Nifty.findByIdAndUpdate(
      id,
      { $set: { name, cmp, pointChange, lastPoint } },
      { new: true }
    ).lean();
    res.status(200).json(updated);
  } catch (error) {
    console.error('Error updating nifty:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default updateNifty;
