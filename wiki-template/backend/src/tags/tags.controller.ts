import { Controller, Get, Param } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @Get(':id/pages')
  getPages(@Param('id') id: string) {
    return this.tagsService.getPagesByTag(id);
  }
}
