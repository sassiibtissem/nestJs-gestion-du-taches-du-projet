import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ToDoList {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
