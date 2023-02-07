import express from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const router = express.Router();

router.post('/', (req, res, next) => new MotorcycleController(req, res, next).newBike());

export default router;