import express from 'express';
import * as controllers from "../controllers/index.ts";
const router= express.Router();
router.get('/',controllers.user.readUser);
router.post('/',controllers.user.createUser);
router.patch('/:id',controllers.user.updateUser);
router.delete('/:id',controllers.user.deleteUser);
export default router;