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

  public getBikes = async (): Promise<Motorcycle[]> => {
    const bikes = await this.model.getBikes();
    return bikes.map((bike) => this.bikeDomain(bike));
  };

  public getBikeById = async (id: string): Promise<Motorcycle | 422 | 404> => {
    const result = await this.model.getBikeById(id);
    if (typeof result === 'number') return 422;
    if (result === null) return 404;
    return this.bikeDomain(result);
  };
}