import React, { useState } from "react";

function ExpandableText({ text }) {
  const limit = 255;
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length <= limit) {
    return <article>{text}</article>;
  }

  return (
    <div>
      {isExpanded ? (
        <article>{text}</article>
      ) : (
        <article>{text.substring(0, limit)}...</article>
      )}

      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
}

export default ExpandableText;
