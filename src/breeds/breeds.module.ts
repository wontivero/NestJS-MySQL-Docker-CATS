import { Module } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { BreedsController } from './breeds.controller';
import { Breed } from './entities/breed.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Breed])],//esto es para q cree la tabla
  controllers: [BreedsController],
  providers: [BreedsService],
  exports: [TypeOrmModule]
})
export class BreedsModule {}
