export interface BaseState<T> {
  data: T
  pending: boolean
  error: unknown
}