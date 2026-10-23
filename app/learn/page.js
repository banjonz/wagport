import Link from 'next/link';
import articles from '../../data/articles';

export const metadata = {
  title: 'Learn: moving a dog out of the UAE',
  description: 'Plain-English answers on costs, timings, rabies tests and paperwork for moving a dog from the UAE, each backed by official sources.',
};

export default function Learn() {
  return (
    <div className="guide">
      <div className="eyebrow">Learn</div>
      <h1>Moving a dog out of the UAE: your questions answered</h1>
      <p className="lede">Costs, timings, rabies tests and paperwork, each answer linked to its official source.</p>
      <ul className="routes-list">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link href={`/learn/${a.slug}/`}>
              {a.title}
              <small>{a.description}</small>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
