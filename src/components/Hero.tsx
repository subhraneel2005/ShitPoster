"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import AnimatedBars from "./AnimatedBars";
import { AnimatePresence, motion } from "framer-motion";

export default function Hero() {
  const [showBars, setShowBars] = useState(false);

  const handleStartSpeaking = () => {
    setShowBars(true);
  };

  return (
    <div className="min-h-screen w-full justify-center items-center flex flex-col">
      <h1 className="text-6xl md:text-7xl font-bold tracking-tighter text-center">
        ShitPoster
      </h1>
      <p className="text-lg tracking-tighter max-w-2xl mt-1">
        Speak your mind and shitpost on twitter
      </p>

      <AnimatePresence mode="wait">
        {!showBars && (
          <Button
            onClick={handleStartSpeaking}  // Using the parent function here
            className="mt-6 flex gap-1 justify-center items-center"
          >
            Start speaking
          </Button>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showBars && (
          <motion.div
            key="bars"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <AnimatedBars setShowBars={setShowBars} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
