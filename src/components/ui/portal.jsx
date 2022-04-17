import { createPortal } from 'react-dom';

const portalRoot = document.getElementById('custom-portal');

function Portal({ isOpen, children }) {
  if (!isOpen) {
    return null;
  }

  return createPortal(children, portalRoot);
}

export default Portal;
