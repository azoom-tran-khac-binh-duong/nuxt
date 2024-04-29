export default defineEventHandler((event) => {
  const { $sentry } = event.context

  $sentry?.captureException(new Error('Hello, Sentry!'))

  return 'Hello, Sentry!'
})
