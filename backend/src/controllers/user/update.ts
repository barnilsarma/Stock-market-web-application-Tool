import { Request, Response } from 'express';
import User from '../../models/user';
import mongoose from 'mongoose';

const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid user id' });
        }
        const updatedUser = await User.findByIdAndUpdate(id, { name, email, role }, { new: true }).lean();
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default updateUser;