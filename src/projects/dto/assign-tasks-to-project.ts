import { InputType, Field } from '@nestjs/graphql';
import { Tasks } from 'src/tasks/entities/taskSchema';

// import { Tasks } from 'src/tasks/entities/taskSchema';

@InputType()
export class AssignTasksToProjectInput {
 

  // @Field(() => [Tasks])
  // taskIds: Tasks[];
}