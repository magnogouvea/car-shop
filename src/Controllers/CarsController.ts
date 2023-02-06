import { Request, Response, NextFunction } from 'express';
import ICar from '../Interfaces/ICar';
import CarsService from '../Services/CarsService';

class CarsController {
  private service: CarsService;

  constructor(private req: Request, private res: Response, private next: NextFunction) {
    this.service = new CarsService();
  }

  public async newCar() {
    const car: ICar = { ...this.req.body };

    try {
      const newCar = await this.service.newCar(car);
      return this.res.status(201).json(newCar);
    } catch (e) {
      this.next(e);
    }
  }
}

export default CarsController;