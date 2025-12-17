import { Request, Response } from 'express';
import User from '../../models/user';

const readUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.query;
        const userData = await User.findOne({ email }).lean();
        res.status(200).json(userData);
    } catch (error) {
        console.error('Error reading user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default readUser;