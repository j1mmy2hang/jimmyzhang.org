import Breadcrumb from '../components/Breadcrumb';
import '../styles/page.css';

export default function Section({ name }: { name: string }) {
  return (
    <main className="page">
      <Breadcrumb section={name} />
      <h1 className="page-title">{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
      <article className="prose">
        <p className="page-status">coming soon</p>
      </article>
    </main>
  );
}
