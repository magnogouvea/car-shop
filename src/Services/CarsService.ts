import ICar from '../Interfaces/ICar';
import CarsODM from '../Models/CarsODM';
import Car from '../Domains/Car';

class CarsService {
  model: CarsODM;

  constructor() {
    this.model = new CarsODM();
  }

  private carDomain = (obj: ICar): Car => new Car(obj); 

  public async newCar(car: ICar): Promise<Car> {
    const result = await this.model.newCar(car);
    return this.carDomain(result);
  }
}

export default CarsService;