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

  public async getCars() {
    try {
      const cars = await this.service.getCars();
      return this.res.status(200).json(cars);
    } catch (e) {
      this.next(e);
    }
  }

  public async getCarById() {
    const { id } = this.req.params;
    const result = await this.service.getCarById(id);

    if (typeof result !== 'number') {
      return this.res.status(200).json(result);
    }

    if (result === 422) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    } 

    return this.res.status(404).json({ message: 'Car not found' });
  }
}

export default CarsController;