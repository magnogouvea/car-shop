import { Model, Schema, model, models } from 'mongoose';
import ICar from '../Interfaces/ICar';

class CarsODM {
  private model: Model<ICar>;
  private schema: Schema;

  constructor() {
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      year: { type: Number, required: true },
      buyValue: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
    });
    this.model = models.Cars || model('Cars', this.schema);
  }

  newCar = async (obj: ICar): Promise<ICar> => this.model.create({ ...obj });
}

export default CarsODM;