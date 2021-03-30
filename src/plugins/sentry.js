import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

const dsn = import.meta.env.VITE_SENTRY_DSN;

export default function sentry() {
  if (dsn) {
    Sentry.init({
      dsn,
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 1.0,
    });
  }
}
