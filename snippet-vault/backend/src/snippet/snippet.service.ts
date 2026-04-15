import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { CreateSnippetDto } from 'src/dto/create-snippet.dto';
import { UpdateSnippetDto } from 'src/dto/update-snippet.dto';

import { Snippet, SnippetDocument } from 'src/schema/snippet.schema';

@Injectable()
export class SnippetService {
  constructor(
    @InjectModel(Snippet.name)
    private snippetModel: Model<SnippetDocument>,
  ) {}

  async create(dto: CreateSnippetDto): Promise<Snippet> {
    return this.snippetModel.create(dto);
  }

  async findAll(q?: string, tag?: string, page = 1, limit = 10) {
    const filter: {
      $text?: { $search: string };
      tags?: string;
    } = {};

    if (q) {
      filter.$text = { $search: q };
    }

    if (tag) {
      filter.tags = tag;
    }

    return this.snippetModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
  }

  async findOne(id: string): Promise<Snippet> {
    const snippet = await this.snippetModel.findById(id);
    if (!snippet) throw new NotFoundException('Snippet not found');
    return snippet;
  }

  async update(id: string, dto: UpdateSnippetDto): Promise<Snippet> {
    const updated = await this.snippetModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!updated) throw new NotFoundException('Snippet not found');

    return updated;
  }

  async remove(id: string) {
    const deleted = await this.snippetModel.findByIdAndDelete(id);

    if (!deleted) throw new NotFoundException('Snippet not found');

    return { message: 'Deleted successfully' };
  }
}
