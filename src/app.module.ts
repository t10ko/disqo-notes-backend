import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from './notes/notes.module';
import { NotesController } from './notes/controllers/notes.controller';
import { Note } from './notes/models/notes.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [Note],
      synchronize: true,
    }),
    NotesModule,
  ],
  controllers: [NotesController],
  providers: [],
})
export class AppModule {}
