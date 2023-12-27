import { User } from './../../users/entities/user.entity';
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class loginResponse{
    @Field()
    access_token:string
    @Field(()=>User)
    user:User
}