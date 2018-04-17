/**
 * Wait for <forInMs> milliseconds.
 */
export default async function(forInMs: number): Promise<void> {
  return new Promise<void>((resolve: () => void): NodeJS.Timer => setTimeout(resolve, forInMs))
}
