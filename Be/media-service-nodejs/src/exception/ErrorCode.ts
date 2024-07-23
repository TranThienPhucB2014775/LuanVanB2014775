import { httpStatusCodes } from '~/constants/httpStatusCodes'

class ErrorCode {
  code: number
  message: string
  statusCode: number

  constructor(code: number, message: string, statusCode: number) {
    this.code = code
    this.message = message
    this.statusCode = statusCode
  }
}

const ErrorDetails = {
  UNKNOWN_ERROR: new ErrorCode(-1, 'Unknown error', httpStatusCodes.INTERNAL_SERVER_ERROR),
  AUTHORIZATION_DENIED: new ErrorCode(9998, 'Authorization denied', httpStatusCodes.FORBIDDEN),
  FILE_NOT_FOUND: new ErrorCode(1, 'File not found', httpStatusCodes.NOT_FOUND),
  FILE_SIZE_TOO_LARGE: new ErrorCode(2, 'File size too large', httpStatusCodes.BAD_REQUEST),
  FILE_NAME_NOT_MATCH: new ErrorCode(3, 'File name not match', httpStatusCodes.BAD_REQUEST)
}

export { ErrorCode, ErrorDetails }
