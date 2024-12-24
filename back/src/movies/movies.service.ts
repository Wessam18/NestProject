import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async getFavorites() {
    const favorites = await this.prisma.favoriteMovie.findMany();
    return favorites.map((movie) => ({
      ...movie,
      _id: movie.id, // Add _id to match the frontend
    }));
  }
  

  async addFavorite(data: any) {
    const movieData = {
      title: data.title,
      year: data.year,
      imdbID: data.imdbID,
      poster: data.poster || "https://via.placeholder.com/200x300?text=No+Poster", // Default if no poster is provided
      director: data.director || "Unknown", // Provide a default director value
      image1: data.image1 || "https://via.placeholder.com/200x300?text=No+Image", // Default if no image is provided
    };
  
    return this.prisma.favoriteMovie.create({
      data: movieData,
    });
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
