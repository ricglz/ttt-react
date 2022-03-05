declare module '*.jpg' {
  export default '' as string;
}
declare module '*.png' {
  export default '' as string;
}
declare module '*.gif' {
  export default '' as string;
}
declare module '*.svg?inline' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const ReactComponent: any;
}

declare module '*.svg' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const ReactComponent: any;
}
