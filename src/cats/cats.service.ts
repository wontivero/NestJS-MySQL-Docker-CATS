import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';
import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class CatsService {
  //ESto  habilita el find(), Create(), etc. es como agregar la tabla de la BD
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private breedsRepository: Repository<Breed>,
  ) {}

  async create(createCatDto: CreateCatDto) {
    const breed = await this.breedsRepository.findOneBy({
      name: createCatDto.breed,
    }); //createCatDto.breed viene a ser el campo breed q envia en el post cuando se crea un gato

    if (!breed) {
      throw new BadRequestException('Breed not found');
    }

    const newCat = this.catsRepository.create({ ...createCatDto, breed }); //con los ... copio el objeto createCatDto y le agrego el breed completo q encontre con la busqueda de la linea 22
    return await this.catsRepository.save(newCat);
  }

  async findAll() {
    return await this.catsRepository.find();
  }

  async findOne(id: number) {
    return await this.catsRepository.findOneBy({ id });
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const cat = await this.catsRepository.findOneBy({ id });

    if (!cat) {
      throw new BadRequestException('Cat not found');
    }

    let breed;
    if (updateCatDto.breed) {
      breed = await this.breedsRepository.findOneBy({
        name: updateCatDto.breed,
      });

      if (!breed) {
        throw new BadRequestException('Breed not found');
      }
    }

    return await this.catsRepository.save({
      ...cat,
      ...updateCatDto,
      breed,
    });
  }

  async remove(id: number) {
    return await this.catsRepository.softDelete({ id });
  }
}
