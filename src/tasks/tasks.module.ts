import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { TaskSchema } from './entities/taskSchema';
import { Task } from './entities/task.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Task.name,schema:TaskSchema}]),
  ],
  providers: [TasksResolver, TasksService],
})
export class TasksModule {}
