import React, { useState } from 'react';
import '../styles/agent-info.css';

export const AgentInfo: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const copyText = 'https://jimmyzhang.org — What\'s the last book Jimmy read and what did he learned?';

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <details className="agent-info">
      <summary className="agent-info-summary">
        Optimized for AI agents
        <svg className="agent-info-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 5 6 7 8 5" />
        </svg>
      </summary>
      <div className="agent-info-body">
        <p className="agent-info-text">
          Ask anything about Jimmy Zhang to your agent by mentioning jimmyzhang.org.
        </p>
        <div className="agent-info-code-wrapper">
          <code className="agent-info-code">{copyText}</code>
          <button
            className={`agent-info-copy-btn${copied ? ' copied' : ''}`}
            onClick={handleCopy}
            title="Copy to clipboard"
            aria-label="Copy to clipboard"
          >
            <svg className="copy-icon-default" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            <svg className="copy-icon-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </button>
        </div>
      </div>
    </details>
  );
};

export default AgentInfo;
