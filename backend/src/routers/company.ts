import express from 'express';
import * as controllers from "../controllers/index.ts";
const router= express.Router();
router.get('/',controllers.company.readCompany);
router.post('/',controllers.company.createCompany);
router.patch('/:id',controllers.company.updateCompany);
router.delete('/:id',controllers.company.deleteCompany);
export default router;