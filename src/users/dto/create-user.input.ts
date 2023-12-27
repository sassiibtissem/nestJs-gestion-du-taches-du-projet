import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({nullable:true})
  _id: number;
  @Field({nullable:true})
  firstName: string;
  @Field({nullable:true})
  lastName: string;
  @Field()  
 email: string;
 @Field()
 password: string;
 @Field({nullable:true})
 cin: string;
 
}
