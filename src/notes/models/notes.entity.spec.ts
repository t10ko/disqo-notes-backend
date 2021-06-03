import { Note } from './notes.entity';

describe('NoteEntity', () => {
  it('should be defined', () => {
    expect(new Note()).toBeDefined();
  });
});
