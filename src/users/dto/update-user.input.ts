import { IsNotEmpty, isNotEmpty } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  //nullable:true tnajjem champ mat3adichi
  @Field({nullable:true})
  
  _id?: number;
  @Field()
  firstName: string;
  @Field()
  
  lastName: string;
  @Field()
  
  email: string;
  @Field()
  
  password: string;
  @Field()
 
  cin: string;
}
