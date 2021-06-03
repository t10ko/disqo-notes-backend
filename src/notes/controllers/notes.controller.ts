import {
  Get,
  Post,
  Put,
  Delete,
  Controller,
  Body,
  Param,
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { Note } from '../models/notes.entity';
import { NoteDto } from '../note.dto';

@Controller('contacts')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get(':searchQuery')
  index(@Param('searchQuery') searchQuery): Promise<Note[]> {
    return this.notesService.findAll(String(searchQuery));
  }

  @Post()
  async create(@Body() noteData: NoteDto): Promise<any> {
    return this.notesService.create(noteData);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() noteData: NoteDto): Promise<any> {
    return this.notesService.update(Number(id), noteData);
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<any> {
    return this.notesService.delete(Number(id));
  }
}
