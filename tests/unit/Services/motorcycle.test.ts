import { describe } from 'mocha';
import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

const mockBike = {
  id: '594ced02ed345b2b049222c5',
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};

const reqBody = {
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};

const bike = new Motorcycle(mockBike as IMotorcycle);

describe('MotorcycleService Tests', () => {
  beforeEach(function () { return sinon.restore(); });

  const service = new MotorcycleService();

  it('Tests the function newBike in case of sucess', async function () {
    sinon.stub(Model, 'create').resolves(mockBike);

    const result = await service.newBike(reqBody as IMotorcycle);

    expect(result).to.be.deep.equal(bike);
  });

  it('Tests the function getBikes in case of sucess', async function () {
    sinon.stub(Model, 'find').resolves([mockBike, mockBike]);

    const result = await service.getBikes();

    expect(result).to.be.deep.equal([bike, bike]);
  });

  it('Tests the function getBikeById in case of sucess', async function () {
    sinon.stub(Model, 'findOne').resolves(mockBike);

    const result = await service.getBikeById('6348513f34c397abcad040b2');

    expect(result).to.be.deep.equal(bike);
  });

  it('Tests the function getBikeById in case of invalid ID', async function () {
    sinon.stub(Model, 'findOne').resolves({});

    const result = await service.getBikeById('invalidId');

    expect(result).to.be.deep.equal(422);
  });

  it('Tests the function getBikeById in case of nonexistent bike', async function () {
    sinon.stub(Model, 'findOne').resolves(null);

    const result = await service.getBikeById('6348513f34c397abcad040b2');

    expect(result).to.be.deep.equal(404);
  });

  it('Tests the function bikeUpdate in case of sucess', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(mockBike);

    const result = await service
      .bikeUpdate('594ced02ed345b2b049222c5', reqBody as IMotorcycle);

    expect(result).to.be.deep.equal(bike);
  });

  it('Tests the function bikeUpdate in case of invalid id', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves({});

    const result = await service.bikeUpdate('invalidId', reqBody as IMotorcycle);

    expect(result).to.be.deep.equal(422);
  });

  it('Tests the function bikeUpdate in case of nonexistent car', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

    const result = await service
      .bikeUpdate('6348513f34c397abcad040b2', reqBody as IMotorcycle);

    expect(result).to.be.deep.equal(404);
  });
});