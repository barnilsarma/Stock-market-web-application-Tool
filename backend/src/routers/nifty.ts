import express from "express";
import * as controllers from "../controllers/index.ts";

const router = express.Router();    
router.get('/', controllers.nifty.readNifty);
router.post('/', controllers.nifty.createNifty);
router.patch('/:id', controllers.nifty.updateNifty);
router.delete('/:id', controllers.nifty.deleteNifty);

export default router;