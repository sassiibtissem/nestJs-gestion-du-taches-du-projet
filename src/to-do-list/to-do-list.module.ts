import { Module } from '@nestjs/common';
import { ToDoListService } from './to-do-list.service';
import { ToDoListResolver } from './to-do-list.resolver';

@Module({
  providers: [ToDoListResolver, ToDoListService],
})
export class ToDoListModule {}
