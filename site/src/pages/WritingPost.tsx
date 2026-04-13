import { useParams } from 'react-router-dom';
import MarkdownPage from './MarkdownPage';

export default function WritingPost() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return null;
  return <MarkdownPage path={`/writing/${slug}.md`} section="writing" />;
}
