import { Schema, isValidObjectId } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import AbstractODM from './AbstractODM';

export default class MotorcycleODM extends AbstractODM<IMotorcycle> {
  constructor() {
    super(new Schema<IMotorcycle>({
      model: { type: String, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      year: { type: Number, required: true },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    }), 'Motorcycles');
  }

  newBike = async (bike: IMotorcycle): Promise<IMotorcycle> => this.model.create({ ...bike });

  getBikes = async (): Promise<IMotorcycle[]> => this.model.find({});

  getBikeById = async (id: string): Promise<IMotorcycle | null | number> => {
    if (!isValidObjectId(id)) {
      return 422;
    }
    return this.model.findOne({ _id: id });
  };
}