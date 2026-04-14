import Breadcrumb from '../components/Breadcrumb';
import '../styles/page.css';

export default function Section({ name }: { name: string }) {
  return (
    <main>
      <Breadcrumb section={name} />
      <article>
        <header className="page-header">
          <h1 className="page-title">{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
        </header>
        <div className="prose">
          <p className="page-status">coming soon</p>
        </div>
      </article>
    </main>
  );
}
