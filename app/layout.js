import './globals.css';
import Link from 'next/link';

export const metadata = {
  metadataBase: new URL('https://wagport.co'),
  title: {
    default: 'Wagport: Moving your dog out of the UAE',
    template: '%s | Wagport',
  },
  openGraph: {
    siteName: 'Wagport',
    type: 'website',
    locale: 'en_GB',
  },
  description:
    'Free route check for moving a dog from the UAE to the UK, EU, Australia or New Zealand. Every deadline worked back from official government rules.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@500;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        <div className="wrap">
          <header>
            <Link href="/" className="brand" aria-label="Wagport home">
              <img src="/mark.png" alt="" width="44" height="44" />
              <span className="word">Wag<span>port</span></span>
            </Link>
            <nav className="top">
              <Link href="/guides/">Route guides</Link>
              <a href="mailto:hello@wagport.co">Contact</a>
            </nav>
          </header>
          {children}
          <footer className="site">
            <span>© {new Date().getFullYear()} Wagport · hello@wagport.co</span>
            <span><Link href="/terms/">Terms and disclaimer</Link></span>
          </footer>
        </div>
      </body>
    </html>
  );
}
