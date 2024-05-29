import React, { useState, useRef, useEffect } from 'react';
import { IconButton } from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { format } from 'date-fns'; // Import date-fns for date formatting

const RecordingButton = () => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const recordingStartDateRef = useRef(null);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange); // Listen for visibility change
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange); // Cleanup on unmount
    };
  }, []);

  const startRecording = () => {
    navigator.mediaDevices.getDisplayMedia({ video: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          chunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = () => {
          downloadRecording();
          setIsRecording(false);
          chunksRef.current = []; // Clear chunks after download
        };

        recordingStartDateRef.current = new Date(); // Record start date
        mediaRecorder.start();
        setIsRecording(true);
      })
      .catch(error => {
        console.error('Error accessing screen:', error);
      });
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      // Stop recording when tab becomes hidden
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        stopRecording();
      }
    }
  };

  const downloadRecording = () => {
    const blob = new Blob(chunksRef.current, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const dateString = format(recordingStartDateRef.current, 'yyyyMMdd_HHmmss'); // Format current date
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = `recording_${dateString}.webm`; // Add formatted date to filename
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      {isRecording ? (
        <IconButton onClick={stopRecording} color="secondary">
          <StopCircleIcon fontSize="large" />
        </IconButton>
      ) : (
        <IconButton onClick={startRecording} color="primary">
          <PlayCircleFilledIcon fontSize="large" />
        </IconButton>
      )}
    </div>
  );
};

export default RecordingButton;
