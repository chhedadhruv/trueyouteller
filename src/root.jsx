import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, Link } from 'react-router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BadgeToast from './components/BadgeToast';
import AnalyticsNotice from './components/AnalyticsNotice';
import { themeInitScript } from './components/ThemeToggle';
import './styles/App.css';

export const links = () => [
  { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
  { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
  { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
  { rel: 'manifest', href: '/site.webmanifest' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Chewy&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap',
  },
];

export function Layout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#5B2C6F" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="App">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
        <BadgeToast />
        <AnalyticsNotice />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return <div className="container section page-loading" aria-busy="true">Loading…</div>;
}

export function ErrorBoundary({ error }) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <div className="container section error-page">
      <title>{notFound ? 'Page Not Found | TrueYouTeller' : 'Something went wrong | TrueYouTeller'}</title>
      <meta name="robots" content="noindex" />
      <h1>{notFound ? 'Oops! This page wandered off 🔮' : 'Oops! Something went wrong'}</h1>
      <p>
        {notFound
          ? "The crystal ball couldn't find what you were looking for."
          : 'Please refresh the page or head back home.'}
      </p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
}
