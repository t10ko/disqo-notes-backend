import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from '../models/notes.entity';
import { NotesRepository } from '../notes.repository';
import { NoteDto } from '../note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NotesRepository)
    private notesRepository: NotesRepository,
  ) {}

  async getList(searchString: string): Promise<Note[]> {
    return await this.notesRepository.getNotes(searchString);
  }

  async create(note: NoteDto): Promise<Note> {
    return await this.notesRepository.createNote(note);
  }

  async update(id, note: NoteDto): Promise<void> {
    await this.notesRepository.updateNote(id, note);
  }

  async delete(id): Promise<void> {
    await this.notesRepository.deleteNote(id);
  }
}
