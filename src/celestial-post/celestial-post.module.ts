import { Module } from '@nestjs/common';
import { CelestialPostService } from './celestial-post.service';
import { CelestialPostResolver } from './celestial-post.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CelestialPost } from './entities/celestial-post.entity';
@Module({
  imports: [TypeOrmModule.forFeature([CelestialPost])],
  providers: [CelestialPostResolver, CelestialPostService],
  exports: [CelestialPostService],
})
export class CelestialPostModule {}
