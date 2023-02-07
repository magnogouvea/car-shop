import { Request, Response, NextFunction } from 'express';
import MotorcycleService from '../Services/MotorcycleService';

export default class MotorcycleController {
  private service: MotorcycleService;

  constructor(private req: Request, private res: Response, private next: NextFunction) {
    this.service = new MotorcycleService();
  }

  public async newBike() {
    try {
      const newMotorCycle = await this.service.newBike({ ...this.req.body });
      return this.res.status(201).json(newMotorCycle);
    } catch (error) {
      this.next(error);
    }
  }
}