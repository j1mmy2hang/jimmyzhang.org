import React from 'react';
import '../styles/agent-info.css';

export const Credits: React.FC = () => {
  return (
    <a
      href="https://github.com/j1mmy2hang/jimmyzhang.org"
      target="_blank"
      rel="noopener noreferrer"
      className="agent-info-summary"
    >
      View source project
    </a>
  );
};

export default Credits;
