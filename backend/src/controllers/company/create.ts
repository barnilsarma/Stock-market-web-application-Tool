import { Request, Response } from 'express';
import User from '../../models/user'; 
import Company from '../../models/company';

const createCompany = async (req: Request, res: Response) => {
    const { name, cmp, pointChange, lastPoint, userId } = req.body;
    const ownerId = (req as any).user?._id || userId; 

    if (!ownerId) {
        return res.status(400).json({ message: 'User ID is required to associate the company.' });
    }

    try {
        const userExists = await User.findById(ownerId).select('_id');
        if (!userExists) {
            return res.status(404).json({ message: `User with ID ${ownerId} not found.` });
        }

        const newCompany = new Company({ 
            name, 
            cmp, 
            pointChange, 
            lastPoint, 
            user: ownerId, 
        });
        
        await newCompany.save();

        res.status(201).json(newCompany);
        
    } catch(error) {
        console.error('Error creating Company:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default createCompany;