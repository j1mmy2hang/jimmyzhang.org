import { Link } from 'react-router-dom';

import '../styles/home.css';

// Temporarily trimmed. Full set: self, telos, note, project, writing, photo.
const sections = ['photo', 'project', 'newsletter'];

export default function Home() {
  return (
    <main className="home">
      <div className="home-wrap">
        <div className="home-inner">
          <div className="home-main">
            <h1 className="home-name">
              <Link to="/jimmyzhang-md" className="home-nav-link">jimmyzhang.md</Link>
            </h1>
            <nav className="home-nav" aria-label="sections">
              {sections.map((name) => (
                <Link key={name} to={`/${name}`} className="home-nav-link">
                  /{name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
}
