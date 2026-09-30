import { Link } from 'react-router-dom';

import '../styles/home.css';

// Temporarily trimmed. Full set: self, telos, note, project, writing, photo.
const rows: string[][] = [
  ['photo', 'project', 'newsletter'],
];

export default function Home() {
  return (
    <main className="home">
      <div className="home-wrap">
        <div className="home-inner">
          <div className="home-main">
            <h1 className="home-name">
              <Link to="/readme" className="home-nav-link">readme.md</Link>
            </h1>
            <nav className="home-nav" aria-label="sections">
              {rows.map((row, i) => (
                <div key={i} className="home-nav-row">
                  {row.map((name) => (
                    <Link key={name} to={`/${name}`} className="home-nav-link">
                      /{name}
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
}
