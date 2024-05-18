import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.findOneById(id);
  }

  @Post()
  createCar(@Body() payload: any) {
    return {
      payload,
    };
  }
  @Patch(':id')
  updateCar(@Body() payload: any, @Param('id', ParseIntPipe) id: number) {
    return {
      id,
      payload,
    };
  }
  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    return {
      delete: id,
    };
  }
}
