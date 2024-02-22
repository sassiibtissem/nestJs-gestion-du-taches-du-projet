import { Task } from 'src/tasks/entities/task.entity';

import { ObjectType, Field, Int } from '@nestjs/graphql';
// definition data schema
@ObjectType()
export class Project {
  @Field({ nullable: true })
  _id: string;
  @Field({ nullable: true })
  projectName: string;
  @Field({ nullable: true })
  userId: string;
  @Field({ nullable: true })
  subject: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  leader_name: string;
  @Field({ nullable: true })
  start_date: string;
  @Field({ nullable: true })
  end_date: string;

  
}
