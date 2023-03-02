import React, { useState } from 'react';

function FontSizeControlPanel() {
  const [fontSize, setFontSize] = useState(16);

  function handleFontSizeChange(event) {
    setFontSize(event.target.value);
  }

  return (
    <div>
      <label htmlFor="font-size-select">Font size:</label>
      <select id="font-size-select" value={fontSize} onChange={handleFontSizeChange}>
        <option value="12">12px</option>
        <option value="16">16px</option>
        <option value="20">20px</option>
      </select>
    </div>
  );
}

export default FontSizeControlPanel;
