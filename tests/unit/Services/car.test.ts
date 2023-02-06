import { expect } from 'chai';
import { describe } from 'mocha';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarsService';

const carMock = {
  id: '594ced02ed345b2b049222c5',
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
};

const reqBody = {
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
};

const car = new Car(carMock);

describe('CarService Tests', () => {
  beforeEach(function () { return sinon.restore(); });

  const service = new CarService();

  it('Tests the function newCar in case of sucess', async function () {
    sinon.stub(Model, 'create').resolves(carMock);

    const result = await service.newCar(reqBody);

    expect(result).to.be.deep.equal(car);
  });

  it('Tests the function getCars in case of sucess', async function () {
    sinon.stub(Model, 'find').resolves([carMock, carMock]);

    const result = await service.getCars();

    expect(result).to.be.deep.equal([car, car]);
  });

  it('Tests the function getCarById in case of sucess', async function () {
    sinon.stub(Model, 'findOne').resolves(carMock);

    const result = await service.getCarById('6376a33a74b37e71cea6a2d6');

    expect(result).to.be.deep.equal(car);
  });

  it('Tests the function getCarById in case of invalid ID', async function () {
    sinon.stub(Model, 'findOne').resolves({});

    const result = await service.getCarById('invalidId');

    expect(result).to.be.deep.equal(422);
  });

  it('Tests the function getCarById in case of nonexistent car', async function () {
    sinon.stub(Model, 'findOne').resolves(null);

    const result = await service.getCarById('6376a33a74b37e71cea6a2d6');

    expect(result).to.be.deep.equal(404);
  });

  it('Tests the function carUpdate in case of sucess', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMock);

    const result = await service.carUpdate('594ced02ed345b2b049222c5', reqBody);

    expect(result).to.be.deep.equal(car);
  });

  it('Tests the function carUpdate in case of invalid id', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves({});

    const result = await service.carUpdate('invalidId', reqBody);

    expect(result).to.be.deep.equal(422);
  });

  it('Tests the function carUpdate in case of nonexistent car', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

    const result = await service.carUpdate('6376a33a74b37e71cea6a2d6', reqBody);

    expect(result).to.be.deep.equal(404);
  });
});