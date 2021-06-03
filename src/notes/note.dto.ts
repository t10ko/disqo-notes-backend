import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NoteDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255, {
    message: 'Note title is too long',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  text: string;
}
