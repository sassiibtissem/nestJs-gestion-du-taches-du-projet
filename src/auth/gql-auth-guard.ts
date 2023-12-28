import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    console.log('🍊[ctx]:', ctx);
    const request = ctx.getContext().req;
    console.log('🥗[request]:', request);
    request.body = ctx.getArgs().loginAuthInput;
    console.log('🥚[request.body ]:', request.body);

    // console.log('🥑[ request.body]:', request.body);

    if (!request) {
      throw new UnauthorizedException('You are not allowed');
    }
    return request;
  }
}
