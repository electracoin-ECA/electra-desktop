/**
 * Wait for <inMs> milliseconds.
 */
export default async function(inMs: number): Promise<void> {
  return new Promise<void>((resolve: () => void): NodeJS.Timer => setTimeout(resolve, inMs))
}
