import React, { useState, useEffect } from 'react';

const TypingAnimation = ({ content, typingSpeed }) => {
  const [displayContent, setDisplayContent] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (typingIndex <= content.length) {
        setDisplayContent(content.substring(0, typingIndex));
        setTypingIndex(typingIndex + 1);
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [typingIndex, content, typingSpeed]);

  return <div>{displayContent}</div>;
};

export default TypingAnimation;
