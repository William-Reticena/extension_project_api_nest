import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  registerDecorator,
} from 'class-validator'

@ValidatorConstraint({ name: 'isOneOf', async: false })
export class IsOneOfConstraint {
  validate(value: string, validationArguments: ValidationArguments) {
    return validationArguments.constraints.includes(value)
  }

  defaultMessage(args: ValidationArguments) {
    return `Value ${args.value} is invalid`
  }
}

export function IsOneOf(
  validationValues: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isOneOf',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsOneOfConstraint,
      constraints: validationValues,
    })
  }
}
