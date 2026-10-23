import Link from 'next/link';
import { notFound } from 'next/navigation';
import articles, { UPDATED_AT } from '../../../data/articles';
import RouteCheck from '../../components/RouteCheck';
import { SLUGS, RULES } from '../../lib/routes';

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) return {};
  return { title: a.title, description: a.description, alternates: { canonical: `/learn/${a.slug}/` } };
}

export default async function Article({ params }) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    dateModified: UPDATED_AT,
    publisher: { '@type': 'Organization', name: 'Wagport', url: 'https://wagport.co' },
    citation: a.sources.map((s) => s.url),
  };

  return (
    <div>
      <article className="guide">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="eyebrow">Learn · updated {UPDATED_AT}</div>
        <h1>{a.title}</h1>
        <p className="lede">{a.lead}</p>
        {a.sections.map((s) => (
          <section key={s.h} className="art-sec">
            <h2>{s.h}</h2>
            {(s.p || []).map((t, i) => <p key={i}>{t}</p>)}
            {s.list && <ul>{s.list.map((t, i) => <li key={i}>{t}</li>)}</ul>}
            {s.table && (
              <div className="table-wrap">
                <table>
                  <thead><tr>{s.table.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                  <tbody>{s.table.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
                </table>
              </div>
            )}
          </section>
        ))}
        <section className="art-sec">
          <h2>Sources</h2>
          <ul>
            {a.sources.map((s) => (
              <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a></li>
            ))}
          </ul>
          <p className="hint">Rules change. Confirm your plan with your vet and the destination authority before booking.</p>
        </section>
        {a.route && (
          <p><Link href={`/guides/${SLUGS[a.route]}/`}>Full step-by-step guide: UAE to {RULES.routes[a.route].name}</Link></p>
        )}
        <h2 style={{ fontFamily: 'var(--display)', margin: '8px 0 0' }}>Check your own dates</h2>
      </article>
      <RouteCheck initialKey={a.route || 'GB'} />
    </div>
  );
}
