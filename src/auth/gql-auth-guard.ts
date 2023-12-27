import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext, extend } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { loginUserInput } from "./dto/login-user_input";





@Injectable()
export class GqlAuthGuard extends AuthGuard ('local'){
    constructor (){
super()
    }
getRequest(context: ExecutionContext) {
    const ctx=GqlExecutionContext.create(context);
    const request=ctx.getContext();
    request.body=ctx.getArgs().loginUserInput;
return request;


}}
