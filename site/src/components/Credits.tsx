import React, { useState } from 'react';
import '../styles/agent-info.css';

export const Credits: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`agent-info${open ? ' open' : ''}`}>
      <button className="agent-info-summary" onClick={() => setOpen(!open)}>
        Credits & attributions
        <svg className="agent-info-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 5 6 7 8 5" />
        </svg>
      </button>
      <div className="agent-info-drawer">
        <div className="agent-info-body">
          <ul style={{ margin: 0, paddingLeft: '1.6rem', color: 'var(--tx-2)' }}>
            <li>Color palette — <a href="https://stephango.com/flexoki" target="_blank" rel="noopener noreferrer" className="credits-link">Flexoki</a> by <a href="https://stephango.com" target="_blank" rel="noopener noreferrer" className="credits-link">Steph Ango</a></li>
            <li>Window shade effect by <a href="https://gist.github.com/masonwang025/49edffdff399175af2262e921eaae50b" target="_blank" rel="noopener noreferrer" className="credits-link">Mason Wang</a></li>
            <li><a href="https://obsidian.md" target="_blank" rel="noopener noreferrer" className="credits-link">Obsidian</a> by <a href="https://stephango.com" target="_blank" rel="noopener noreferrer" className="credits-link">Steph Ango</a></li>
            <li>All my dearest friends and family</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Credits;
