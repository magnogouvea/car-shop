import express from 'express';
import CarsRouter from './Routes/CarsRouter';
import MotorcyclesRouter from './Routes/MotorcycleRouter';

const app = express();
app.use(express.json());
app.use('/cars', CarsRouter);
app.use('/motorcycles', MotorcyclesRouter);

export default app;
