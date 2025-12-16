import { Request, Response } from 'express';
import User from '../../models/user';
import mongoose from 'mongoose';

const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid user id' });
        }
        const deletedUser = await User.findByIdAndDelete(id).lean();
        res.status(200).json(deletedUser);
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default deleteUser;