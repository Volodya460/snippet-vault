import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { CreateSnippetDto } from 'src/dto/create-snippet.dto';
import { UpdateSnippetDto } from 'src/dto/update-snippet.dto';

@Controller('snippets')
export class SnippetController {
  constructor(private readonly snippetService: SnippetService) {}

  @Post()
  create(@Body() dto: CreateSnippetDto) {
    return this.snippetService.create(dto);
  }

  @Get()
  findAll(
    @Query('q') q?: string,
    @Query('tag') tag?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.snippetService.findAll(q, tag, +page, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.snippetService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSnippetDto) {
    return this.snippetService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.snippetService.remove(id);
  }
}
