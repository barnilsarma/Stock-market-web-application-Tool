import { Request, Response } from 'express';
import User from '../../models/user';

const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, role, token } = req.body;
        const newUser = new User({ name, email, role, token });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default createUser;