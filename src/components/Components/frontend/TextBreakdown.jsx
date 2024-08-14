import React from 'react';

const TextBreakdown = ({ text }) => {

  var lines = text.map(item => {
    if (typeof item === 'string') {
      return item.split('\n');
    }
    return item;
  });

  return (
    <div>
      {lines.map((line, index) => (
        <div className={ index != 0 && '' } key={index}>{line}</div>
      ))}
    </div>
  );
};

export default TextBreakdown;
