import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata = {
  metadataBase: new URL('http://159.65.131.196:8000'),
  title: 'Raihan | Web Developer & Tech Enthusiast',
  description: 'Portfolio pribadi Raihan — Web Developer dan Tech Enthusiast dari Semarang, Indonesia.',
  keywords: ['Raihan', 'Web Developer', 'Next.js', 'React', 'Semarang', 'Portfolio'],
  openGraph: {
    title: 'Raihan | Web Developer & Tech Enthusiast',
    description: 'Membangun website, aplikasi, dan sistem yang praktis untuk kebutuhan nyata.',
    type: 'website',
    locale: 'id_ID',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Raihan — Web Developer & Tech Enthusiast' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raihan | Web Developer & Tech Enthusiast',
    description: 'Membangun website, aplikasi, dan sistem yang praktis untuk kebutuhan nyata.',
    images: ['/og-image.svg'],
  },
  icons: { icon: '/favicon.svg' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Raihan',
  url: 'http://159.65.131.196:8000',
  jobTitle: 'Web Developer & Tech Enthusiast',
  homeLocation: { '@type': 'Place', name: 'Semarang, Indonesia' },
  sameAs: ['https://github.com/raihanardiansyah', 'https://linkedin.com/in/raihanardiansah'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
