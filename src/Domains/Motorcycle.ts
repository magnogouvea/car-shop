import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

export default class Motorcycle extends Vehicle {
  private engineCapacity: number;
  private category: string;

  constructor(
    obj: IMotorcycle,
  ) {
    super(obj);
    this.category = obj.category;
    this.engineCapacity = obj.engineCapacity;
  }
}