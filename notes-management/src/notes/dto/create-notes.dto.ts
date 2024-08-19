import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({
    example: 'Learn LLMs RAG Concept',
    description: 'Title of note to be created',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Document Loader, Splitter, etc...',
    description: 'Describe note to be created',
  })
  @IsString()
  @IsNotEmpty()
  body?: string;
}
