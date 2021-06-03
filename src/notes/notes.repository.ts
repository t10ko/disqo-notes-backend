import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { Note } from './models/notes.entity';
import { NoteDto } from './note.dto';

@EntityRepository(Note)
export class NotesRepository extends Repository<Note> {
  async getNotes(searchString: string): Promise<Note[]> {
    const query = this.createQueryBuilder('note');
    if (searchString) {
      query.andWhere('(note.title LIKE :search OR note.text LIKE :search)', {
        search: `%${searchString}%`,
      });
    }

    query.orderBy({
      id: 'DESC',
    });
    return await query.getMany();
  }

  async createNote(noteDto: NoteDto): Promise<Note> {
    const { title, text } = noteDto;

    const note = new Note();

    note.createdDate = new Date();
    note.title = title;
    note.text = text;

    try {
      await note.save();
    } catch (e) {
      throw new InternalServerErrorException();
    }

    return note;
  }

  async updateNote(id: number, noteDto: NoteDto): Promise<Note> {
    const found = await this.findOne({ where: { id } });
    if (!found) {
      return this.create(noteDto);
    }

    const { title, text } = noteDto;
    found.title = title;
    found.text = text;

    await found.save();

    return found;
  }

  async deleteNote(id: number): Promise<Note> {
    const found = await this.findOne({ where: { id } });
    if (found) {
      await found.remove();
    }
    return found;
  }
}
