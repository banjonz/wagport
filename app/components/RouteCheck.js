'use client';

import { useEffect, useMemo, useState } from 'react';
import { RULES, LAUNCH } from '../lib/routes';

const DAY = 864e5;
const addDays = (d, n) => new Date(d.getTime() + n * DAY);
const fmt = (d) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const iso = (d) =>
  new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);

function startOfToday() {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t;
}

export default function RouteCheck({ initialKey = 'GB' }) {
  const [today, setToday] = useState(null);
  const [dest, setDest] = useState(initialKey);
  const [travel, setTravel] = useState('');
  const [age, setAge] = useState(24);
  const [vacc, setVacc] = useState(true);
  const [desexed, setDesexed] = useState(true);

  // Dates depend on the viewer's clock, so set them after mount.
  useEffect(() => {
    const t = startOfToday();
    setToday(t);
    setTravel(iso(addDays(t, 45)));
  }, []);

  const launch = Object.entries(RULES.routes).filter(([k]) => LAUNCH.includes(k));
  const preview = Object.entries(RULES.routes).filter(([k]) => !LAUNCH.includes(k));

  const result = useMemo(() => {
    if (!today || !travel) return null;
    const r = RULES.routes[dest];
    const tv = new Date(travel + 'T00:00:00');
    const days = Math.round((tv - today) / DAY);
    const need = vacc ? r.min_lead_days_if_vaccinated : r.min_lead_days_from_scratch;
    const ageBad = r.min_age_months && age < r.min_age_months;

    const alerts = [];
    if (ageBad)
      alerts.push(['bad', `${r.name} needs the dog to be at least ${r.min_age_months} months old on arrival${dest === 'NZ' ? ' (approximate minimum under MPI guidance)' : ''}.`]);
    if (dest === 'US')
      alerts.push(['warn', 'The UAE is on the CDC high-risk list. Your dog must fly into a US airport with a CDC-registered animal care facility, with a reservation made in advance.']);
    if (dest === 'EU')
      alerts.push(['warn', 'Going to Finland, Ireland or Malta? Add a vet tapeworm treatment 24 to 120 hours before entry.']);
    if (dest === 'CA' && age < 8)
      alerts.push(['warn', 'Under 8 months: check whether your puppy needs a health certificate issued within 72 hours of arrival.']);
    if (dest === 'FR')
      alerts.push(['warn', "France restricts attack-type (category 1 and 2) dogs. Check your dog's breed before booking."]);
    if (r.lead_note) alerts.push(['warn', r.lead_note]);
    if (!desexed && (dest === 'AU' || dest === 'NZ'))
      alerts.push(['warn', 'Entire (not desexed) dogs need a Brucella canis blood test and a no-breeding declaration.']);
    (r.alerts || []).forEach((a) => alerts.push(['warn', a]));
    if (!LAUNCH.includes(dest))
      alerts.push(['warn', 'Preview route: not yet part of the launch set. Rules are sourced but not yet reviewed for launch.']);
    if (r.status !== 'verified')
      alerts.push(['warn', 'Some timings on this route are still being confirmed against official sources.']);

    let cls, stamp, head, sub;
    if (days < 0) {
      cls = 'v-bad'; stamp = 'Past date'; head = 'That date has passed'; sub = 'Pick a future travel date.';
    } else if (days < need || ageBad) {
      cls = 'v-bad'; stamp = 'Not in time';
      head = ageBad ? 'Your dog is too young for this route' : `You need about ${need} days. You have ${days}.`;
      sub = `Earliest realistic travel date: ${fmt(addDays(today, need))}.`;
    } else if (days < need + 14) {
      cls = 'v-warn'; stamp = 'Tight';
      head = `Possible, with ${days - need} days of slack`;
      sub = 'Book vet appointments now. One delayed test result can push you past the window.';
    } else {
      cls = 'v-ok'; stamp = 'On track';
      head = `You have ${days} days. This route needs about ${need}.`;
      sub = 'Follow the deadlines below in order.';
    }
    if (dest === 'US' && days >= 28 && days < need && !vacc)
      sub += ' Or travel sooner and accept a 28-day quarantine at a CDC-registered facility.';

    const steps = [...r.steps, ...RULES.origin_export.steps.map((s) => ({ ...s, uae: true }))]
      .map((s) => {
        let txt = 'Before travel', rel = '', late = false, sortKey = -9999;
        if (s.window) {
          const { from: f, to: t } = s.window;
          if (f !== undefined && t !== undefined) {
            txt = f === t ? fmt(addDays(tv, t)) : `${fmt(addDays(tv, f))} – ${fmt(addDays(tv, t))}`;
            rel = -t === 0 ? 'travel day' : `${-t}–${-f} days before`;
            sortKey = t; late = addDays(tv, t) < today;
          } else if (t !== undefined) {
            txt = 'By ' + fmt(addDays(tv, t)); rel = `${-t}+ days before`;
            sortKey = t; late = addDays(tv, t) < today;
          }
        } else if (s.rule) { txt = 'First'; rel = s.rule; sortKey = -10000; }
        else { txt = 'Plan ahead'; sortKey = -500; }
        if (vacc && /rabies|chip/i.test(s.title) && !/titer|RNATT/i.test(s.title)) {
          txt = 'Done'; rel = 'you said this is done'; late = false;
        }
        return { ...s, txt, rel, late, sortKey };
      })
      .sort((a, b) => a.sortKey - b.sortKey);

    return { r, days, need, alerts, cls, stamp, head, sub, steps };
  }, [today, travel, dest, age, vacc, desexed]);

  return (
    <div className="tool">
      <form onSubmit={(e) => e.preventDefault()} noValidate>
        <div>
          <label htmlFor="dest">Moving to</label>
          <select id="dest" value={dest} onChange={(e) => setDest(e.target.value)}>
            <optgroup label="Launch routes">
              {launch.map(([k, r]) => (
                <option key={k} value={k}>{k === 'EU' ? 'European Union (other countries)' : r.name}</option>
              ))}
            </optgroup>
            <optgroup label="Coming soon (preview)">
              {preview.map(([k, r]) => (
                <option key={k} value={k}>{r.name}</option>
              ))}
            </optgroup>
          </select>
        </div>
        <div>
          <label htmlFor="travel">Dog&apos;s travel date</label>
          <input type="date" id="travel" value={travel} onChange={(e) => setTravel(e.target.value)} />
        </div>
        <div>
          <label htmlFor="age">Dog&apos;s age on travel day (months)</label>
          <input type="number" id="age" min="2" max="240" value={age}
            onChange={(e) => setAge(+e.target.value || 0)} />
        </div>
        <div>
          <span className="lbl">Already done</span>
          <label className="check">
            <input type="checkbox" id="vacc" checked={vacc} onChange={(e) => setVacc(e.target.checked)} />
            Microchipped, then rabies-vaccinated more than 30 days ago, and the vaccine is still valid
          </label>
          <label className="check" style={{ marginTop: 8 }}>
            <input type="checkbox" id="desexed" checked={desexed} onChange={(e) => setDesexed(e.target.checked)} />
            Desexed (spayed or neutered)
          </label>
        </div>
        <p className="hint">Example values are filled in. Change them to match your dog.</p>
      </form>

      <div className="sheet" aria-live="polite">
        {!result ? (
          <div className="verdict v-warn">
            <div className="stamp">Loading</div>
            <div><h2>Working out your deadlines</h2><p>One moment.</p></div>
          </div>
        ) : (
          <>
            <div className={`verdict ${result.cls}`}>
              <div className="stamp">{result.stamp}</div>
              <div><h2>{result.head}</h2><p>{result.sub}</p></div>
            </div>
            <div className="facts">
              <span>Route <b>UAE → {result.r.name}</b></span>
              <span>Days left <b>{Math.max(result.days, 0)}</b></span>
              <span>Minimum lead <b>{result.need} days</b></span>
              <span>Rule status <span className={`tag ${result.r.status}`}>
                {result.r.status === 'verified' ? 'verified' : 'to confirm'}</span></span>
            </div>
            <div className="alerts">
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>{result.r.classification}</div>
              {result.alerts.map(([k, a], i) => (
                <div key={i} className={`alert ${k === 'bad' ? 'bad' : ''}`}>{a}</div>
              ))}
            </div>
            <ol className="steps">
              {result.steps.map((s) => (
                <li key={s.id} className="step">
                  <div className={`when ${s.late ? 'late' : ''}`}>
                    {s.txt}
                    <span className="rel">{s.late ? 'missed: talk to your vet' : s.rel}</span>
                  </div>
                  <div>
                    <h3>{s.title}{s.uae && <> <span className="tag unverified">UAE side · to confirm</span></>}</h3>
                    <p>{s.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="src">
              Official sources:{' '}
              {result.r.sources.map((s, i) => (
                <span key={s.url}>
                  {i > 0 && ' · '}
                  <a href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a>
                </span>
              ))}
              . Last checked {fmt(new Date(result.r.last_verified))}.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
