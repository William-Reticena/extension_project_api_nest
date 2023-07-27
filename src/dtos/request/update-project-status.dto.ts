import { IsNotEmpty, IsNumber } from 'class-validator'
import { IsOneOf } from '@/helpers/custom-validators/is-one-of'
import { ProjectStatusEnum } from '@/helpers/enums'

export class UpdateProjectStatusDTO {
  @IsNumber({}, { message: 'Project id must be a number' })
  @IsNotEmpty({ message: 'Project id is required' })
  readonly projectId: number

  @IsNotEmpty({ message: 'Status is required' })
  @IsOneOf(Object.values(ProjectStatusEnum), {
    message:
      'Status must be one of: Em andamento, Concluído, Pendente, Cancelado',
  })
  readonly status: string
}
