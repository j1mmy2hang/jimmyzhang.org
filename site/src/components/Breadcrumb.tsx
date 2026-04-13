import { Link } from 'react-router-dom';

export default function Breadcrumb({ section }: { section: string }) {
  return (
    <nav className="breadcrumb" aria-label="breadcrumb">
      <Link to="/" className="breadcrumb-home">
        Jimmy Zhang
      </Link>
      <span className="breadcrumb-sep">/</span>
      <Link to={`/${section}`} className="breadcrumb-section">
        {section}
      </Link>
    </nav>
  );
}
