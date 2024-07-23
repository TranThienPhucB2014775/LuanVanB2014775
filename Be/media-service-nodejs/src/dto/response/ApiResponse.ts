export class ApiResponse<T> {
  code: number = 0
  result!: T
  constructor(code: number, result: T) {
    this.code = code
    this.result = result
  }

  setCode(code: number) {
    this.code = code
  }

  setResult(result: T) {
    this.result = result
  }
}
