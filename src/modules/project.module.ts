import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Project } from '@/entities/project.entity'
import { ProjectController } from '@/controllers/project.controller'
import { ProjectService } from '@/services/project.service'

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
