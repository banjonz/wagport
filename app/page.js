import Link from 'next/link';
import RouteCheck from './components/RouteCheck';
import { RULES, LAUNCH, SLUGS, routeName } from './lib/routes';

export default function Home() {
  return (
    <>
      <div className="hero">
        <div className="eyebrow">Leaving the UAE with a dog</div>
        <h1>Will your dog make the flight?</h1>
        <p className="lede">
          Pick where you&apos;re moving and your travel date. We work backwards from official
          government rules and show every deadline, from rabies tests to the MOCCAE export
          certificate.
        </p>
      </div>

      <RouteCheck initialKey="GB" />

      <section className="more">
        <h2>From a free check to a dog on the plane</h2>
        <div className="tiers">
          <div className="tier">
            <h3>Free check</h3><div className="price">Free</div>
            <p>Your route, your date, a clear verdict and every deadline. What you&apos;re using now.</p>
          </div>
          <div className="tier main">
            <h3>DIY Plan</h3><div className="price">AED 475 per pet · coming soon</div>
            <p>A dated plan for your exact dog, WhatsApp reminders before each deadline, and a check of your vet&apos;s paperwork against the rules before you fly.</p>
          </div>
          <div className="tier">
            <h3>Relocator match</h3><div className="price">Free to you</div>
            <p>Prefer someone else handles it? We introduce you to vetted Dubai relocators and export vets with your file already prepared.</p>
          </div>
        </div>
      </section>

      <section className="more">
        <h2>Route guides</h2>
        <ul className="routes-list">
          {LAUNCH.map((k) => (
            <li key={k}>
              <Link href={`/guides/${SLUGS[k]}/`}>
                UAE to {RULES.routes[k].name}
                <small>About {RULES.routes[k].min_lead_days_from_scratch} days from scratch</small>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="fine">
        Wagport is a planning tool, not a vet or a government authority. Rules change; every
        requirement links to its official source with the date we last checked it. Confirm the plan
        with your vet and the destination authority before booking. Steps marked &quot;to confirm&quot;
        are still being verified against official sources.
      </p>
    </>
  );
}
