import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { MongooseModule } from '@nestjs/mongoose';


import { Project } from './entities/project.entity';
import { ProjectSchema } from './entities/projectSchema';


@Module({
  imports:[
    MongooseModule.forFeature([{name:Project.name, schema:ProjectSchema   }]),],
  providers: [ProjectsResolver, ProjectsService],
 exports:[ProjectsService]

})
export class ProjectsModule {}
