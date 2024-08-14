import React, { useState, useEffect } from 'react';

const useTypingAnimation = (text, speed) => {
    const [message, setMessage] = useState('');
    const [typing, setTyping] = useState(true);

    useEffect(() => {
      let index = 0;

      if (typing) {
        const typingInterval = setInterval(() => {
          setMessage((prevMessage) => prevMessage + text[index]);
          index++;

          if (index === text.length) {
            setTyping(false);
            clearInterval(typingInterval);
          }
        }, speed);
      }

      return () => {
        clearInterval(typingInterval);
      };
    }, [text, speed, typing]);

    return { message, typing };
  };


export default useTypingAnimation;
