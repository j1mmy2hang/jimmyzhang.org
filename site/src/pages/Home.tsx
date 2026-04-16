import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SubscribeForm from '../components/SubscribeForm';
import AgentInfo from '../components/AgentInfo';

import '../styles/home.css';

const rows: string[][] = [
  ['self', 'telos', 'note'],
  ['project', 'writing', 'photo'],
];

const INTRO_KEY = 'home-intro-done';

export default function Home() {
  const hasPlayed = useRef(!!sessionStorage.getItem(INTRO_KEY));
  const [phase, setPhase] = useState(hasPlayed.current ? 2 : 0);

  useEffect(() => {
    if (hasPlayed.current) return;
    const t1 = setTimeout(() => setPhase(1), 2000);
    const t2 = setTimeout(() => {
      setPhase(2);
      sessionStorage.setItem(INTRO_KEY, '1');
    }, 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <main className={`home phase-${phase}${hasPlayed.current ? ' no-intro' : ''}`}>
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
