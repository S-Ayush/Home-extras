import { memo } from 'react';
import { createPortal } from 'react-dom';

import './styles.css';

function Overlay({ show, ...props }) {
  if (!show) return null;

  return createPortal(
    <div className="custom-overlay" {...props} />,
    document.getElementById('custom-portal')
  );
}

export default memo(Overlay);
