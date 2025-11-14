/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { BadRequestException, Body, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { BaseEntity } from 'typeorm'

export class BaseController {
  entity: typeof BaseEntity

  @Get()
  findAll() {
    return this.entity.find()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const formatted = +id
    if (isNaN(formatted)) {
      throw new BadRequestException('Invalid parameter format')
    }
    return this.entity.findOneBy({ id: formatted } as any)
  }

  @Post()
  async create(@Body() dto: Record<string, any>) {
    const result = await this.entity.create(dto).save()
    return result
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Record<string, any>) {
    const formatted = +id
    if (isNaN(formatted)) {
      throw new BadRequestException('Invalid parameter format')
    }
    return this.entity.update({ id: formatted } as any, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const formatted = +id
    if (isNaN(formatted)) {
      throw new BadRequestException('Invalid parameter format')
    }
    return this.entity.delete({ id: formatted } as any)
  }
}

