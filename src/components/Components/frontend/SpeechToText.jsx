import React, { useState, useEffect, useRef } from 'react';
import {UilMicrophone} from '@iconscout/react-unicons'
const SpeechToText = (props) => {
  const [isRecording, setIsRecording] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [fullTranscript, setFullTranscript] = useState('');
  const recognition = useRef(null);

  useEffect(() => {
    if(props.isSubmit)
    {
        stopListening()
        setFullTranscript('')
        setTranscript('')
    }
  }, [props.isSubmit])

  const handlePermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setPermissionGranted(true);
      setIsRecording(true)
    } catch (error) {
      console.log('Permission denied:', error);
    }
  };



  const startListening = () => {
    setIsRecording(true);
    props.onPlaceHolder(true)

    recognition.current = new window.webkitSpeechRecognition();
    recognition.current.continuous = true;
    recognition.current.interimResults = true;
    recognition.current.lang = 'en-US';

    recognition.current.onresult = event => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(finalTranscript);
      setFullTranscript(prevTranscript => prevTranscript + finalTranscript);
    };

    recognition.current.start();
  };

  const stopListening = () => {
    setIsRecording(false);

    if (recognition.current) {
      recognition.current.stop();
      recognition.current.onresult = null;
      recognition.current.onend = null;
      recognition.current = null;
    }

    props.onPlaceHolder(false)
  };

  useEffect(() => {
    if (isRecording && permissionGranted) {
      startListening();
    } else {
      stopListening();
    }

    if (!isRecording && recognition.current) {
      recognition.current.onend = () => {
        recognition.current.start();
      };
    }
  }, [isRecording, permissionGranted]);

  useEffect(() => {
    props.onTextChange(fullTranscript); // Pass the updated fullTranscript to the parent component
  }, [fullTranscript]);

  const toggleListening = () => {
    if (isRecording) {
      stopListening();
    } else {
      handlePermission();
    }
  };

  return (

        <button type='button' onClick={toggleListening}>
            {isRecording ? (
                <><UilMicrophone className='color'  size={19} /></>
            ) : (
                <><UilMicrophone className='text-gray-500'  size={19} /></>
            )}
        </button>

  );
};

export default SpeechToText;
