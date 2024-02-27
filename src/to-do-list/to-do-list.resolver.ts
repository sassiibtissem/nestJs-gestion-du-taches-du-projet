import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ToDoListService } from './to-do-list.service';
import { ToDoList } from './entities/to-do-list.entity';
import { CreateToDoListInput } from './dto/create-to-do-list.input';
import { UpdateToDoListInput } from './dto/update-to-do-list.input';

@Resolver(() => ToDoList)
export class ToDoListResolver {
  constructor(private readonly toDoListService: ToDoListService) {}

  @Mutation(() => ToDoList)
  createToDoList(@Args('createToDoListInput') createToDoListInput: CreateToDoListInput) {
    return this.toDoListService.create(createToDoListInput);
  }

  @Query(() => [ToDoList], { name: 'toDoList' })
  findAll() {
    return this.toDoListService.findAll();
  }

  @Query(() => ToDoList, { name: 'toDoList' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.toDoListService.findOne(id);
  }

  @Mutation(() => ToDoList)
  updateToDoList(@Args('updateToDoListInput') updateToDoListInput: UpdateToDoListInput) {
    return this.toDoListService.update(updateToDoListInput.id, updateToDoListInput);
  }

  @Mutation(() => ToDoList)
  removeToDoList(@Args('id', { type: () => Int }) id: number) {
    return this.toDoListService.remove(id);
  }
}
