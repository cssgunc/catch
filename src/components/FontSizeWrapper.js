import { useState } from 'react';
import styles from './FontSizeWrapper.css';

function FontSizeWrapper({ children }) {
  const [fontSize, setFontSize] = useState('16px');

  

  const wrapperStyles = {

    fontSize:fontSize,
  };

  const handleToggleFontSize = () => {
    setFontSize(prevSize => prevSize === `calc(${fontSize} * 2)` ? `calc(${fontSize} * 1.1)` : `calc(${fontSize} * 2)`);
  };

  const handleDescaleFontSize = () => {
    setFontSize('16px');
  };

  return (
    <div style={wrapperStyles} className="font-size-wrapper">
      <button onClick={handleToggleFontSize}>
        Toggle font size
      </button>
      <button onClick={handleDescaleFontSize}>
        Descale font size
      </button>
      {children}
    </div>
  );
}

export default FontSizeWrapper;
