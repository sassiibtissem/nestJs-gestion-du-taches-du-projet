
import { ObjectType, Field, Int } from '@nestjs/graphql';


//declaration entity (table)

// type UserDocument = HydratedDocument<Users>;

// @Schema()
// export class Users {
//   @Prop({ required: true })
//   _id: number;
//   @Prop({ required: true })
//   firstName: string;
//   @Prop({ required: true })
//   lasstName: string;

//   @Prop({ required: true })
//   email: string;
//   @Prop({ required: true, unique: true })
//   password: string;
//   @Prop({ required: true })
//   cin: string;
// }
//export schema entity
// export const UserSchema = SchemaFactory.createForClass(Users)

// declaration des outputs 
@ObjectType()
export class User {
  @Field({nullable:true})
  _id: string;
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
  @Field()
 role: string;
}
