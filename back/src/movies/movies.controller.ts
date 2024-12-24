import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('favorites')
  async getFavorites() {
    return this.moviesService.getFavorites();
  }

  @Post('favorites')
  async addFavorite(@Body() data: any) {
    return this.moviesService.addFavorite(data);
  }

  @Put('favorites/:id')
  async updateFavorite(@Param('id') id: number, @Body() data: any) {
    return this.moviesService.updateFavorite(id, data);
  }

  @Delete('favorites/:id')
  async deleteFavorite(@Param('id') id: number) {
    return this.moviesService.deleteFavorite(id);
  }
}
