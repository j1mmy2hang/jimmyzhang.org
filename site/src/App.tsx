import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Home loads eagerly — it's the landing page and we don't want a round trip
// before the first paint. Everything else is code-split so the initial
// bundle only carries what's on screen.
import Home from './pages/Home';
import ThemeToggle from './components/ThemeToggle';
import DappledLight from './components/DappledLight';

const Self = lazy(() => import('./pages/Self'));
const Telos = lazy(() => import('./pages/Telos'));
const Writing = lazy(() => import('./pages/Writing'));
const WritingPost = lazy(() => import('./pages/WritingPost'));
const Photo = lazy(() => import('./pages/Photo'));
const PhotoPage = lazy(() => import('./pages/PhotoPage'));
const MarkdownPage = lazy(() => import('./pages/MarkdownPage'));
const Project = lazy(() => import('./pages/Project'));
const NoteIndex = lazy(() => import('./pages/NoteIndex'));
const BookShelf = lazy(() => import('./pages/BookShelf'));
const ClippingWheel = lazy(() => import('./pages/ClippingWheel'));
const NotePage = lazy(() => import('./pages/NotePage'));
const Newsletter = lazy(() => import('./pages/Newsletter'));
const NewsletterPost = lazy(() => import('./pages/NewsletterPost'));
const NewsletterDashboard = lazy(() => import('./pages/NewsletterDashboard'));

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/self" element={<Self />} />
        <Route
          path="/self/personal-statement"
          element={<MarkdownPage path="/self/personal-statement.md" section="self" />}
        />
        <Route
          path="/self/self-portrait"
          element={<MarkdownPage path="/self/self-portrait.md" section="self" />}
        />
        <Route
          path="/self/skills"
          element={<MarkdownPage path="/self/skills.md" section="self" />}
        />
        <Route path="/telos" element={<Telos />} />
        <Route
          path="/telos/key-beliefs"
          element={<MarkdownPage path="/telos/key-beliefs.md" section="telos" />}
        />
        <Route
          path="/telos/measure-of-vitality"
          element={<MarkdownPage path="/telos/measure-of-vitality.md" section="telos" />}
        />
        <Route
          path="/telos/academic-inquiry"
          element={<MarkdownPage path="/telos/academic-inquiry.md" section="telos" />}
        />
        <Route path="/writing" element={<Writing />} />
        <Route path="/writing/:slug" element={<WritingPost />} />
        <Route path="/photo" element={<Photo />} />
        <Route path="/photo/:slug" element={<PhotoPage />} />
        <Route path="/project" element={<Project />} />
        <Route path="/note" element={<NoteIndex />} />
        <Route path="/note/book" element={<BookShelf />} />
        <Route path="/note/book/:slug" element={<NotePage type="book" />} />
        <Route path="/note/clipping" element={<ClippingWheel />} />
        <Route path="/note/clipping/:slug" element={<NotePage type="clipping" />} />
        <Route path="/note/atomic" element={<Navigate to="/note" replace />} />
        <Route path="/note/atomic/:slug" element={<NotePage type="atomic" />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/newsletter/dashboard" element={<NewsletterDashboard />} />
        <Route path="/newsletter/:slug" element={<NewsletterPost />} />
        <Route
          path="/how-can-i-help-you"
          element={<MarkdownPage path="/how-can-i-help-you.md" section="" />}
        />
      </Routes>
      </Suspense>
      <ThemeToggle />
      <DappledLight />
    </>
  );
}
