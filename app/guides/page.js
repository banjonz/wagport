import Link from 'next/link';
import { RULES, LAUNCH, SLUGS } from '../lib/routes';

export const metadata = {
  title: 'Route guides',
  description: 'Step-by-step guides for moving a dog out of the UAE, built from official government rules.',
};

export default function Guides() {
  const keys = Object.keys(RULES.routes);
  const launch = keys.filter((k) => LAUNCH.includes(k));
  const preview = keys.filter((k) => !LAUNCH.includes(k));
  const item = (k) => (
    <li key={k}>
      <Link href={`/guides/${SLUGS[k]}/`}>
        UAE to {RULES.routes[k].name}
        <small>About {RULES.routes[k].min_lead_days_from_scratch} days from scratch</small>
      </Link>
    </li>
  );
  return (
    <div className="guide">
      <div className="eyebrow">Route guides</div>
      <h1>Moving a dog out of the UAE</h1>
      <p className="lede">Pick your destination for the full list of steps, timings and official sources.</p>
      <ul className="routes-list">{launch.map(item)}</ul>
      <h2 style={{ fontFamily: 'var(--display)', margin: '12px 0 0' }}>Coming soon</h2>
      <ul className="routes-list">{preview.map(item)}</ul>
    </div>
  );
}
