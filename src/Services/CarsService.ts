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

  public getCars = async (): Promise<Car[]> => {
    const cars = await this.model.getCars();
    return cars.map((car) => this.carDomain(car));
  };

  public getCarById = async (id: string): Promise<Car | 422 | 404> => {
    const result = await this.model.getCarById(id);

    if (typeof result === 'number') return 422;

    if (result === null) return 404;

    return this.carDomain(result);
  };

  public carUpdate = async (id: string, car: ICar): Promise<Car | 422 | 404> => {
    const result = await this.model.carUpdate(id, car);

    if (typeof result !== 'number') {
      return this.carDomain(result);
    }

    return result;
  };
}

export default CarsService;