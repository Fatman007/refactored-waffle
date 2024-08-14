import React, { useEffect, useState } from 'react';
import { Linkify } from 'react-linkify';
import LinkableText from './LinkableText';
import TextBreakdown from './TextBreakdown';

const Typewriter = ({ text }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);

      } else {
        clearInterval(intervalId);
      }

    }, 10); // Adjust the speed of typing by changing the interval time (e.g., 100ms)

    return () => {
      clearInterval(intervalId);
    };



  }, [text, currentIndex]);

  return  <>{currentText}</>;
};

export default Typewriter;
