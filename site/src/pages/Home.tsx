import { Link } from 'react-router-dom';
import SubscribeForm from '../components/SubscribeForm';
import AgentInfo from '../components/AgentInfo';

import '../styles/home.css';

const rows: string[][] = [
  ['self', 'telos', 'note'],
  ['project', 'writing', 'photo'],
];

export default function Home() {
  return (
    <main className="home">
      <div className="home-inner">
        <div className="home-main">
          <h1 className="home-name">Jimmy Zhang</h1>
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
      <div className="home-secondary">
        <SubscribeForm variant="home" />
        <AgentInfo />
      </div>
    </main>
  );
}
