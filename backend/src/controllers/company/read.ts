import { Request, Response } from 'express';
import Company from '../../models/company';
import mongoose from 'mongoose';

const readCompany = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		if (id) {
			if (!mongoose.isValidObjectId(id)) {
				return res.status(400).json({ message: 'Invalid company id' });
			}
			const company = await Company.findById(id).populate('user').lean();
			return res.status(200).json(company);
		}

		// List companies with optional filters
		const { userId, page = '1', limit = '20' } = req.query as any;
		const query: any = {};
		if (userId) query.user = userId;
		const p = Math.max(1, parseInt(page, 10) || 1);
		const l = Math.max(1, parseInt(limit, 10) || 20);
		const items = await Company.find(query).skip((p - 1) * l).limit(l).lean();
		res.status(200).json({ page: p, limit: l, data: items });
	} catch (error) {
		console.error('Error reading company:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export default readCompany;

