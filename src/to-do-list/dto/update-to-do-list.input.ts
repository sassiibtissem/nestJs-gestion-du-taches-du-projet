import { CreateToDoListInput } from './create-to-do-list.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateToDoListInput extends PartialType(CreateToDoListInput) {
  @Field(() => Int)
  id: number;
}
