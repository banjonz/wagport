import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="prose">
      <h1>Page not found</h1>
      <p><Link href="/">Back to the route check</Link></p>
    </div>
  );
}
