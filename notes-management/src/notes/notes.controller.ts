import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Query,
  Body,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-notes.dto';
import { UpdateNoteDto } from './dto/update-notes.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createNoteDto: CreateNoteDto) {
    return await this.notesService.create(createNoteDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const note = await this.notesService.findOne(id);
    if (!note) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
    return note;
  }

  @Get()
  async findByTitle(@Query('title') title: string) {
    return await this.notesService.findByTitle(title);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    console.log(id);
    const updatedNote = await this.notesService.update(id, updateNoteDto);
    if (!updatedNote) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
    return updatedNote;
  }
}
