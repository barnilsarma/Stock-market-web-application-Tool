import { Request, Response } from 'express';
import Nifty from '../../models/nifty';
import mongoose from 'mongoose';

const readNifty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (id) {
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid nifty id' });
      }
      const nifty = await Nifty.findById(id).populate('user').lean();
      return res.status(200).json(nifty);
    }

    const { userId, page = '1', limit = '20' } = req.query as any;
    const query: any = {};
    if (userId) query.user = userId;
    const p = Math.max(1, parseInt(page, 10) || 1);
    const l = Math.max(1, parseInt(limit, 10) || 20);
    const items = await Nifty.find(query).skip((p - 1) * l).limit(l).lean();
    res.status(200).json({ page: p, limit: l, data: items });
  } catch (error) {
    console.error('Error reading nifty:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default readNifty;
