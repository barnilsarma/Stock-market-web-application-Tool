import { Request, Response } from 'express';
import Company from '../../models/company';
import mongoose from 'mongoose';

const updateCompany = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		if (!mongoose.isValidObjectId(id)) {
			return res.status(400).json({ message: 'Invalid company id' });
		}

		const { name, cmp, pointChange, lastPoint } = req.body;
		const updated = await Company.findByIdAndUpdate(
			id,
			{ $set: { name, cmp, pointChange, lastPoint } },
			{ new: true }
		).lean();

		res.status(200).json(updated);
	} catch (error) {
		console.error('Error updating company:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export default updateCompany;
