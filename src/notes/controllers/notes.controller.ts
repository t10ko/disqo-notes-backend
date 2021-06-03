import {
  Get,
  Post,
  Put,
  Delete,
  Controller,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { Note } from '../models/notes.entity';
import { NoteDto } from '../note.dto';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  index(@Query() query): Promise<Note[]> {
    return this.notesService.getList(String(query.q || ''));
  }

  @Post()
  async create(@Body() noteData: NoteDto): Promise<Note> {
    return this.notesService.create(noteData);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() noteData: NoteDto): Promise<void> {
    return this.notesService.update(Number(id), noteData);
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<void> {
    return this.notesService.delete(Number(id));
  }
}
