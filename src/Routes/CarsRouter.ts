import express from 'express';
import CarsController from '../Controllers/CarsController';

const router = express.Router();

router.post('/', (req, res, next) => new CarsController(req, res, next).newCar());
router.get('/', (req, res, next) => new CarsController(req, res, next).getCars());
router.get('/:id', (req, res, next) => new CarsController(req, res, next).getCarById());

export default router;