import { CreateProjectInput } from './create-project.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProjectInput extends PartialType(CreateProjectInput) {

  @Field({ nullable:true})
  projectName: string;
  @Field({ nullable:true})
  subject:string ;
  @Field({ nullable:true})
  
  description:string;
  @Field({ nullable: true })
  userId: string;
  @Field({ nullable:true})
  leader_name:string;
  @Field({ nullable:true})
  start_date:string ; 
   @Field({ nullable:true})
  end_date:string;
}