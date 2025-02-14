import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

/* 
private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Cherokee',
    },
  ];
 */

@Injectable()
export class CarsService {
  private cars: Car[] = [];
  findAll() {
    return this.cars;
  }
  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    return car;
  }
  create(createCarDto: CreateCarDto) {
    const newCar: Car = { id: uuid(), ...createCarDto };
    this.cars.push(newCar);
    return newCar;
  }
  update(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findOneById(id);
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = {
          ...carDB,
          ...updateCarDto,
          id,
        };
        return carDB;
      }
      return car;
    });
    return carDB;
  }
  delete(id: string) {
    const car = this.findOneById(id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);
    this.cars = this.cars.filter((elem) => {
      return elem.id !== id;
    });
  }
  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
