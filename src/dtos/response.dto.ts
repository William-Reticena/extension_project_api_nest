export class ResponseDTO {
  data: any
  userMessage: string
  developerMessage: string
  statusCode: number

  constructor(
    data: any,
    userMessage: string,
    message: string,
    statusCode: number,
  ) {
    this.data = data
    this.userMessage = userMessage
    this.developerMessage = message
    this.statusCode = statusCode
  }
}
