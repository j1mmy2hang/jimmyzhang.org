import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Self from './pages/Self';
import Telos from './pages/Telos';
import Writing from './pages/Writing';
import WritingPost from './pages/WritingPost';
import MarkdownPage from './pages/MarkdownPage';
import Section from './pages/Section';
import ThemeToggle from './components/ThemeToggle';

const otherSections = ['note', 'project', 'photo'];

export default function App() {
  return (
    <>
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
        {otherSections.map((s) => (
          <Route key={s} path={`/${s}`} element={<Section name={s} />} />
        ))}
      </Routes>
      <ThemeToggle />
    </>
  );
}
