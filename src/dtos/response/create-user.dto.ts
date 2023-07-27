import { Professor } from '@/entities/professor.entity'
import { Student } from '@/entities/student.entity'

export class CreateUserResDTO {
  readonly id?: number
  readonly ra?: string
  readonly name: string
  readonly lastName: string
  readonly email: string
  readonly phone: string

  constructor(data: Professor | Student) {
    if (data instanceof Professor) this.id = data.id
    else this.ra = data.ra

    this.name = data.name
    this.lastName = data.lastName
    this.email = data.emailId.email
    this.phone = data.phone
  }
}
