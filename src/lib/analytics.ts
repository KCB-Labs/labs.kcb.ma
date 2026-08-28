export type AnalyticsEvent =
  | 'project_viewed'
  | 'lab_viewed'
  | 'article_viewed'
  | 'github_clicked'
  | 'sponsorship_clicked'
  | 'collaboration_submitted';

export type AnalyticsProvider = 'plausible' | 'umami' | 'none';

interface AnalyticsPayload {
  event: AnalyticsEvent;
  properties?: Record<string, string>;
}

function getProvider(): AnalyticsProvider {
  const provider = import.meta.env.PUBLIC_ANALYTICS_PROVIDER ?? 'none';
  if (provider === 'plausible' || provider === 'umami') return provider;
  return 'none';
}

function trackPlausible(event: AnalyticsEvent, properties?: Record<string, string>) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as Record<string, unknown>;
  const plausible = w.plausible as ((event: string, opts?: { props?: Record<string, string> }) => void) | undefined;
  if (plausible) {
    plausible(event, properties ? { props: properties } : undefined);
  }
}

function trackUmami(event: AnalyticsEvent, properties?: Record<string, string>) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as Record<string, unknown>;
  const umami = w.umami as ((event: string, data?: Record<string, string>) => void) | undefined;
  if (umami) {
    umami(event, properties);
  }
}

export function track(event: AnalyticsEvent, properties?: Record<string, string>): void {
  const provider = getProvider();
  const payload: AnalyticsPayload = { event, properties };

  if (provider === 'plausible') {
    trackPlausible(event, properties);
  } else if (provider === 'umami') {
    trackUmami(event, properties);
  }

  if (import.meta.env.DEV) {
    console.log('[analytics]', payload);
  }
}
