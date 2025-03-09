"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

export default function AnimatedBars({
  setShowBars,
}: {
  setShowBars: (value: boolean) => void;
}) {
  const [bars, setBars] = useState([1, 1, 1, 1]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState<any>(null);

  useEffect(() => {
    // Web Audio API Setup
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256; // Set the size of the FFT window (higher value = more precision)
    const bufferLength = analyser.frequencyBinCount;

    let microphone: MediaStreamAudioSourceNode | null = null;

    const getMicrophone = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        analyseVolume();
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    const analyseVolume = () => {
      const dataArray = new Uint8Array(bufferLength);
      const getVolume = () => {
        analyser.getByteFrequencyData(dataArray);

        // Calculate volume based on frequency data
        const sum = dataArray.reduce((acc, value) => acc + value, 0);
        const volume = sum / dataArray.length; // Simple average of frequency data

        // Scale the volume to a larger range for more visible bar height changes
        const scaledVolume = volume * 3.5; // Increase scaling factor for larger bars
        const newBars = bars.map(() => Math.random() * scaledVolume + 60); // Adjust bars to reflect volume
        setBars(newBars);

        requestAnimationFrame(getVolume); // Continue analyzing volume
      };

      getVolume();
    };

    getMicrophone(); // Start capturing microphone input

    // Speech Recognition Setup
    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";
      setSpeechRecognition(recognition);

      recognition.onstart = () => {
        setIsSpeaking(true);
      };

      recognition.onend = () => {
        setIsSpeaking(false);
      };

      recognition.onresult = (event: any) => {
        // You can use the recognized speech text here if needed.
        const transcript = event.results[event.resultIndex][0].transcript;
        console.log("Speech detected:", transcript);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
      };
    } else {
      console.log("Web Speech API is not supported in this browser.");
    }

    return () => {
      // Clean up the microphone stream when the component is unmounted
      if (microphone) {
        microphone.disconnect();
      }
    };
  }, [bars]);

  const handleStopSpeaking = () => {
    if (speechRecognition) {
      speechRecognition.stop();
    }
    setShowBars(false);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="bars"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.8 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col justify-center items-center p-3 mt-12"
      >
        <div className="flex items-center space-x-2 h-20 md:h-28">
          {bars.map((height, i) => (
            <motion.div
              key={i}
              className="w-14 bg-white rounded-full"
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            ></motion.div>
          ))}
        </div>
        <Button
          className="mt-20"
          variant={"destructive"}
          onClick={handleStopSpeaking}
        >
          Stop speaking
        </Button>
      </motion.div>
    </AnimatePresence>
  );
}
