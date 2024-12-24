import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async getFavorites() {
    return this.prisma.favoriteMovie.findMany();
  }

  async addFavorite(data: any) {
    return this.prisma.favoriteMovie.create({ data });
  }

  async updateFavorite(id: number, data: any) {
    return this.prisma.favoriteMovie.update({
      where: { id: Number(id) },
      data,
    });
  }

  async deleteFavorite(id: number) {
    return this.prisma.favoriteMovie.delete({ where: { id: Number(id) } });
  }
}
