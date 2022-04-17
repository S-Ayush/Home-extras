import { memo } from "react";
import "./styles.css";

function StyledInput(props) {
  return (
    <input
      type="text"
      className="styled-input"
      onChange={props.onChange}
      {...props}
    />
  );
}

export default memo(StyledInput);
