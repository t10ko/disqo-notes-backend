import { Module } from '@nestjs/common';

import { NotesService } from './services/notes.service';
import { NotesController } from './controllers/notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesRepository } from './notes.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NotesRepository])],
  controllers: [NotesController],
  providers: [NotesService],
  exports: [NotesService],
})
export class NotesModule {}
