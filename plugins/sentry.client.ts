import * as Sentry from '@sentry/vue'

export default defineNuxtPlugin(({ vueApp: app }) => {
  const router = useRouter()
  const { public: { sentry: { dsn, environment } } } = useRuntimeConfig()

  Sentry.init({
    app,
    dsn,
    environment,
    integrations: [
      Sentry.browserTracingIntegration({ router }),
      Sentry.replayIntegration(),
    ],

    // Configure this whole part as you need it!
    tracesSampleRate: 0.2, // Change in prod

    // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ['localhost', 'https://your-server.com'],

    replaysSessionSampleRate: 1.0, // Change in prod
    replaysOnErrorSampleRate: 1.0, // Change in prod if necessary
  })
})
