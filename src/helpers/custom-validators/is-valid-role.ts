import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  registerDecorator,
} from 'class-validator'
import { CreateUserReqDTO } from '@/dtos/create-user-req.dto'

@ValidatorConstraint({ name: 'isValidRole', async: false })
export class IsValidRoleConstraint {
  validate(role: string) {
    const validRoles = ['professor', 'student']
    return validRoles.includes(role)
  }

  defaultMessage(args: ValidationArguments) {
    return `Role ${args.value} is invalid`
  }
}

export function IsValidRole(validationOptions?: ValidationOptions) {
  return function (object: CreateUserReqDTO, propertyName: string) {
    registerDecorator({
      name: 'isValidRole',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsValidRoleConstraint,
    })
  }
}
