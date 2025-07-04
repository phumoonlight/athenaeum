import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common'

export class BaseController {
  wat = 'base1'

  @Get()
  findAll() {
    return `This is a base controller method for finding all ${this.wat}`
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This is a base controller method for finding user with id ${id}`
  }

  @Post()
  create(@Body() dto: Record<string, any>) {
    return 'This is a base controller method for creating a user'
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Record<string, any>) {
    return `This is a base controller method for updating user with id ${id}`
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This is a base controller method for removing user with id ${id}`
  }
}

