import { createParamDecorator, ExecutionContext } from '@nestjs/common'

const getCurrenUserByContext = (context: ExecutionContext) =>
    context.switchToHttp().getRequest().user

export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) =>
        getCurrenUserByContext(context),
)
