import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';
import { Task } from 'src/tasks/entities/task.entity';


@InputType()
export class CreateProjectInput {
 
  @Field({ nullable:true})
  projectName: string;
  @Field({ nullable:true})
  subject:string ;
  @Field({ nullable:true})
  description:string;
  @Field({ nullable:true})
  leader_name:string;
  @Field({ nullable: true })
  userId: string;
  @Field({ nullable:true})
  start_date:string ; 
   @Field({ nullable:true})
  end_date:string;
  // @Field(() => [Task], { nullable: true })
  // tasks: Task[];
}


@ObjectType()
export class userProject {
 
  @Field({ nullable:true})
  userId: string;
  @Field({ nullable:true})
  developer_name:string ;
}
