import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field({nullable:true})
  projectId:string;
  @Field({nullable:true})
  projectName:string
  @Field({nullable:true})
  task_name:string;
  @Field({nullable:true})
  description:string;
  @Field({nullable:true})
  start_date:string;
  @Field({nullable:true})
  estimation_time:string;
  @Field({nullable:true})
  developer_name:string;
  @Field({nullable:true})
  state:string;
  @Field({nullable:true})
  developerId:string;
}
