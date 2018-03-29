export interface EventToProp {
  event: string
  instance: any
  prop: string
}

export interface EventToCall {
  event: string
  call(): any | Promise<any>
}
