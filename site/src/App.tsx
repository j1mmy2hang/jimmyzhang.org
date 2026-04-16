import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
import Home from './pages/Home';
import Self from './pages/Self';
import Telos from './pages/Telos';
import Writing from './pages/Writing';
import WritingPost from './pages/WritingPost';
import Photo from './pages/Photo';
import PhotoPage from './pages/PhotoPage';
import MarkdownPage from './pages/MarkdownPage';
import Project from './pages/Project';
import NoteIndex from './pages/NoteIndex';
import BookShelf from './pages/BookShelf';
import ClippingWheel from './pages/ClippingWheel';
import NotePage from './pages/NotePage';
import Newsletter from './pages/Newsletter';
import NewsletterPost from './pages/NewsletterPost';
import NewsletterDashboard from './pages/NewsletterDashboard';
import ThemeToggle from './components/ThemeToggle';
import DappledLight from './components/DappledLight';

export default function App() {
  return (
    <>
      <ScrollToTop />
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
      </Routes>
      <ThemeToggle />
      <DappledLight />
    </>
  );
}
