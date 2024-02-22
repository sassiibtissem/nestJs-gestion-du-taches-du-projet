import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


//declaration entity (table)
type UserDocument = HydratedDocument  <Users>;

@Schema()
export class Users {
  // @Prop({ required: true })
  // _id: number;
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true, unique: true })
  password: string;
  @Prop({ required: true })
  cin: string;
  @Prop( {required: true })
  role:string;
}

//export schema entity
export const UserSchema = SchemaFactory.createForClass(Users)