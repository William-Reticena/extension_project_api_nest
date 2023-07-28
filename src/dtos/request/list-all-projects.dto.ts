import { IsEnum, IsNumberString, IsOptional } from 'class-validator'
import { ProjectStatusEnum } from '@/helpers/enums'

export class ListAllProjectsDTO {
  @IsOptional()
  @IsEnum(ProjectStatusEnum, {
    message: `Status must be one of: ${Object.values(ProjectStatusEnum).join(
      ', ',
    )}`,
  })
  status?: ProjectStatusEnum

  @IsOptional()
  @IsNumberString({ no_symbols: true }, { message: 'Page must be a number' })
  page?: number

  @IsOptional()
  @IsNumberString(
    { no_symbols: true },
    { message: 'Page size must be a number' },
  )
  pageSize?: number
}
