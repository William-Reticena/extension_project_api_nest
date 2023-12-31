import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  registerDecorator,
} from 'class-validator'
import { CreateUserDTO } from '@/dtos/request/create-user.dto'

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
  return function (object: CreateUserDTO, propertyName: string) {
    registerDecorator({
      name: 'isValidRole',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsValidRoleConstraint,
    })
  }
}
