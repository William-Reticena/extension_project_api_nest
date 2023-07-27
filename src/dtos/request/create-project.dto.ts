import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class CreateProjectDTO {
  @IsNumber({}, { message: 'Professor id must be a number' })
  @IsPositive({ message: 'Professor id must be a positive number' })
  @IsNotEmpty({ message: 'Professor id is required' })
  readonly professorId: number

  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(3, { message: 'Name must be at least 3 characters' })
  readonly name: string

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  @MaxLength(255, {
    message: 'Description must be a maximum of 255 characters',
  })
  readonly description: string

  @IsNotEmpty({ message: 'Start date is required' })
  // @IsDate({ message: 'Start date must be a date' })
  readonly startDate: Date

  @IsNotEmpty({ message: 'End date is required' })
  // @IsDate({ message: 'End date must be a date' })
  readonly endDate: Date

  @IsNumber({}, { message: 'Workload must be a number' })
  @IsPositive({ message: 'Workload must be a positive number' })
  @IsNotEmpty({ message: 'Workload is required' })
  readonly workload: number

  @IsNumber({}, { message: 'Quantity vacancies must be a number' })
  @IsPositive({ message: 'Quantity vacancies must be a positive number' })
  @IsNotEmpty({ message: 'Quantity vacancies is required' })
  readonly quantityVacancies: number
}
