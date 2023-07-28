import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Request } from 'express'

@Injectable()
class RoleGuardWrapper implements CanActivate {
  constructor(private readonly permittedRoles: string[]) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>()
    const user = request.user as Express.User & { role: string }

    return this.permittedRoles.includes(user.role)
  }
}

export const RoleGuard = (permittedRoles: string[]) =>
  new RoleGuardWrapper(permittedRoles)
