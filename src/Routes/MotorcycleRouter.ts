import express from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const router = express.Router();

router.post('/', (req, res, next) => new MotorcycleController(req, res, next).newBike());
router.get('/', (req, res, next) => new MotorcycleController(req, res, next).getBikes());
router.get('/:id', (req, res, next) => new MotorcycleController(req, res, next).getBikeById());

export default router;