/** Global definitions for developement **/

// for style loader
declare module '*.css' {
  const styles: any
  export = styles
}
type Partial<T> = {
  [P in keyof T]?: T[P];
}
