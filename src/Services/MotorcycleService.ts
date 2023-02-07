import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import Motorcycle from '../Domains/Motorcycle';

export default class MotorcycleService {
  model: MotorcycleODM;

  constructor() {
    this.model = new MotorcycleODM();
  }

  private bikeDomain = (bike: IMotorcycle) => new Motorcycle(bike);

  public async newBike(motorcycle: IMotorcycle): Promise<Motorcycle> {
    const newBike = await this.model.newBike(motorcycle);
    return this.bikeDomain(newBike);
  }
}