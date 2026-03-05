export interface ApiGetResponse<T = any> {
  status_code: number
  document: T
}
