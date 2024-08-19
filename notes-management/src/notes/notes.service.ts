import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Notes } from './entities/notes.entity';
import { CreateNoteDto } from './dto/create-notes.dto';
import { UpdateNoteDto } from './dto/update-notes.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Notes)
    private readonly notesRepository: Repository<Notes>,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    const note = this.notesRepository.create(createNoteDto);
    return await this.notesRepository.save(note);
  }

  async findOne(id: number) {
    const note = await this.notesRepository.findOne({ where: { id } });
    if (!note) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
    return note;
  }

  async findByTitle(title: string) {
    return await this.notesRepository.find({
      where: { title: Like(`%${title}%`) },
    });
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    const note = await this.notesRepository.preload({
      id: parseInt(id),
      ...updateNoteDto,
    });
    if (!note) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
    return await this.notesRepository.save(note);
  }
}
