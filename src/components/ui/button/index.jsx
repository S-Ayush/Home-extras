import { memo } from 'react';
import './styles.css';

function Button({ children, ...props }) {
  return (
    <button className="styled-btn" {...props}>
      {children}
    </button>
  );
}

export default memo(Button);
