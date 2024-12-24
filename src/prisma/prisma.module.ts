import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaController } from './prisma.controller';
import { ConfigModule } from '@nestjs/config';


@Global()
@Module({
  imports: [ConfigModule], // Import ConfigModule to make ConfigService available
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
