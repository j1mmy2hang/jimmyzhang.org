import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Pages that render markdown via `dangerouslySetInnerHTML` produce plain <a>
// elements for internal links. Clicking them triggers a full browser
// navigation — the SPA remounts, in-memory UI state (DappledLight, theme
// animations) resets, and rapid clicks race the fresh bootstrap.
//
// This hook returns an onClick handler to attach to any container whose HTML
// was set via dangerouslySetInnerHTML. It intercepts same-origin, plain
// left-clicks on anchors and routes them through React Router — preserving
// native semantics for modifier keys, middle-click, target=_blank, and
// download links.
export function useInternalLinkIntercept() {
  const navigate = useNavigate();
  return useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest('a');
      if (!anchor) return;
      const target = anchor.getAttribute('target');
      if (target && target !== '' && target !== '_self') return;
      if (anchor.hasAttribute('download')) return;
      const href = anchor.getAttribute('href');
      if (!href) return;
      if (!href.startsWith('/') || href.startsWith('//')) return;
      e.preventDefault();
      navigate(href);
    },
    [navigate]
  );
}
