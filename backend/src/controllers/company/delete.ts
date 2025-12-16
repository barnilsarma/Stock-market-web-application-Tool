import { Request, Response } from 'express';
import Company from '../../models/company';
import mongoose from 'mongoose';

const deleteCompany = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		if (!mongoose.isValidObjectId(id)) {
			return res.status(400).json({ message: 'Invalid company id' });
		}
		const deleted = await Company.findByIdAndDelete(id).lean();
		res.status(200).json(deleted);
	} catch (error) {
		console.error('Error deleting company:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export default deleteCompany;
