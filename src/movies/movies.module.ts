import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { OmdbService } from './omdb.service';
import { HttpModule } from '@nestjs/axios'; // Importing HttpModule
import { MoviesController } from './movies.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,  // Add HttpModule here to make HttpService available
  ],
  controllers: [MoviesController],
  providers: [MoviesService, OmdbService, PrismaService],
  exports: [MoviesService, OmdbService], // Export services if needed elsewhere
})
export class MoviesModule {}
