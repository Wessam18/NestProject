import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Ensure ConfigModule is imported
    PrismaModule,
    MoviesModule,
  ],
})
export class AppModule {}
