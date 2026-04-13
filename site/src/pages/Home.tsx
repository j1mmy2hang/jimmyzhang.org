import { Link } from 'react-router-dom';
import DappledLight from '../components/DappledLight';
import '../styles/home.css';

const rows: string[][] = [
  ['self', 'telos', 'note'],
  ['project', 'writing', 'photo'],
];

export default function Home() {
  return (
    <main className="home">
      <DappledLight />
      <div className="home-inner">
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
    </main>
  );
}
