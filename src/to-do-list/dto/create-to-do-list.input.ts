import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateToDoListInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
