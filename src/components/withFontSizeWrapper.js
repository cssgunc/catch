import React, { useState } from 'react';

const withFontSizeWrapper = (Component) => {
  return () => {
    const [isFontSizeLarge, setIsFontSizeLarge] = useState(false);

    const handleToggleFontSize = () => {
      setIsFontSizeLarge((prevValue) => !prevValue);
    };

    const fontSizes = {
      default: '16px',
      large: '20px', // or any other value you want for larger font size
    };

    const getFontSize = (tag) => {
      if (isFontSizeLarge) {
        switch (tag) {
          case 'h1':
            return fontSizes.large;
          case 'h2':
            return fontSizes.large;
          case 'h3':
            return fontSizes.large;
          default:
            return fontSizes.large;
        }
      } else {
        return fontSizes.default;
      }
    };

    const getStyles = (tag) => {
      return { fontSize: getFontSize(tag) };
    };

    const wrapperStyles = {
      h1: getStyles('h1'),
      h2: getStyles('h2'),
      h3: getStyles('h3'),
      p: getStyles('p'),
    };

    return (
      <div style={wrapperStyles}>
        <button onClick={handleToggleFontSize}>
          {isFontSizeLarge ? 'Reset Font Size' : 'Increase Font Size'}
        </button>
        <Component />
      </div>
    );
  };
};

export default withFontSizeWrapper;
