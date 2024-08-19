import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNoteDto {
  @ApiProperty({
    example: 'Learn LLMs RAG Concept',
    description: 'Title of note to be created',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'Document Loader, Splitter, etc...',
    description: 'Describe note to be created',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  body?: string;
}
