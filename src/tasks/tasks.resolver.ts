
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.tasksService.createTask(createTaskInput);
  }

  @Query(() => [Task]) // Assuming task is the type you are returning
  async findById(@Args('_id', { type: () => Int }) _id: number): Promise<Task[]> {
    return await this.tasksService.findTaskById(_id);
  }

  @Query(() => Task, { name: 'task' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.findOne(id);
  }

  @Mutation(() => Task)
  async updateTask( 
    @Args('_id', { type: () => Int }) _id: number,
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
    ) {
    return await this.tasksService.update(_id,updateTaskInput);
  }

  @Mutation(() => Task)
  async removeTask(@Args('_id', { type: () => Int }) id: number) {
   const removedTask = await this.tasksService.remove(id);
   if (removedTask){
    return removedTask;
  
  }}






  @Query(() => [Task])
  async getTasks() {
    let tasks = await this.tasksService.getAllTasks();
    console.log(tasks,"tasks")
    return tasks;
    
}
@Query(() => [Task])
async getTaskByState(
  @Args('state') state: string,
): Promise<Task[]> {
  const tasks = await this.tasksService.getTasksByState(state);
  console.log(tasks, "tasks");
  return tasks;
    


}
}
