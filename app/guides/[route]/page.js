import { notFound } from 'next/navigation';
import RouteCheck from '../../components/RouteCheck';
import { RULES, SLUGS, keyFromSlug, routeName, isLaunch, relWindow } from '../../lib/routes';

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(SLUGS).map((route) => ({ route }));
}

export async function generateMetadata({ params }) {
  const { route } = await params;
  const key = keyFromSlug(route);
  if (!key) return {};
  const r = RULES.routes[key];
  return {
    title: `Moving a dog from the UAE to ${r.name}`,
    description: `${r.classification}. Every step, deadline and official source for taking your dog from Dubai or Abu Dhabi to ${routeName(key)}.`,
  };
}

export default async function RouteGuide({ params }) {
  const { route } = await params;
  const key = keyFromSlug(route);
  if (!key) notFound();
  const r = RULES.routes[key];
  const steps = [...r.steps, ...RULES.origin_export.steps.map((s) => ({ ...s, uae: true }))];

  return (
    <div>
      <div className="guide">
        <div className="eyebrow">{isLaunch(key) ? 'Route guide' : 'Route guide · preview'}</div>
        <h1>Moving a dog from the UAE to {routeName(key)}</h1>
        <p className="lede">
          {r.classification}. Plan on about {r.min_lead_days_from_scratch} days if you&apos;re
          starting from scratch, or {r.min_lead_days_if_vaccinated} if your dog is already
          microchipped and rabies-vaccinated.
        </p>
        <div className="sheet">
          <ol className="steps">
            {steps.map((s) => (
              <li key={s.id} className="step">
                <div className="when">{relWindow(s)}</div>
                <div>
                  <h3>{s.title}{s.uae && <> <span className="tag unverified">UAE side · to confirm</span></>}</h3>
                  <p>{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="src">
            Official sources:{' '}
            {r.sources.map((s, i) => (
              <span key={s.url}>
                {i > 0 && ' · '}
                <a href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a>
              </span>
            ))}
            . Last checked {r.last_verified}.
          </div>
        </div>
        <h2 style={{ fontFamily: 'var(--display)', margin: '16px 0 0' }}>Check your own dates</h2>
      </div>
      <RouteCheck initialKey={key} />
    </div>
  );
}
