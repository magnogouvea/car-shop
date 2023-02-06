import express from 'express';
import CarsController from '../Controllers/CarsController';

const router = express.Router();

router.post('/', (req, res, next) => new CarsController(req, res, next).newCar());

export default router;