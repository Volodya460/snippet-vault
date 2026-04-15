import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { SnippetType } from './create-snippet.dto';

export class UpdateSnippetDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsEnum(SnippetType)
  type?: SnippetType;
}
