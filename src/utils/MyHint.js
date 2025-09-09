import React, { useContext } from "react";
import { YMapHintContext } from "ymap3-components";

function MyHint() {
  const hint = useContext(YMapHintContext);

  return (
    <div className="hint">
      <div className="hint-header">{hint?.hint}</div>
      <div className="hint-hint">{hint?.hint}</div>
      <div className="hint-desc">{hint?.hint}</div>
    </div>
  );
}

export default MyHint;
