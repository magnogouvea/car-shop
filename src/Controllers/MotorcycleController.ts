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

  public async getBikes() {
    try {
      const bikes = await this.service.getBikes();
      return this.res.status(200).json(bikes);
    } catch (e) {
      this.next(e);
    }
  }

  public async getBikeById() {
    const { id } = this.req.params;
    const result = await this.service.getBikeById(id);

    if (typeof result !== 'number') {
      return this.res.status(200).json(result);
    }

    if (result === 422) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    } 

    return this.res.status(404).json({ message: 'Motorcycle not found' });
  }

  public async bikeUpdate() {
    const { id } = this.req.params;
    const body = { ...this.req.body };
    const result = await this.service.bikeUpdate(id, body);

    if (typeof result !== 'number') {
      return this.res.status(200).json(result);
    }

    if (result === 422) return this.res.status(422).json({ message: 'Invalid mongo id' });

    this.res.status(404).json({ message: 'Motorcycle not found' });
  }
}