'use client';

import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceSearchProps {
  onResult: (text: string) => void;
}

export function VoiceSearch({ onResult }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Voice search is not supported in this browser. Please use Chrome.");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-IN';

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('Listening...');
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const resultTranscript = event.results[current][0].transcript;
      setTranscript(resultTranscript);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (transcript && transcript !== 'Listening...') {
        onResult(transcript);
      }
    };

    recognition.start();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <AnimatePresence>
        {isListening && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md"
          >
            <div className="text-center p-12 bg-slate-900 border border-blue-500/30 rounded-3xl shadow-2xl relative">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center animate-pulse">
                   <Mic className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 mt-8">Speak your query...</h3>
              <p className="text-xl text-blue-400 font-medium italic min-h-[40px]">
                "{transcript}"
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <div className="flex gap-1 h-8 items-center">
                   {[1,2,3,4,5].map(i => (
                     <motion.div 
                        key={i}
                        animate={{ height: [10, 30, 10] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-1.5 bg-blue-500 rounded-full"
                     />
                   ))}
                </div>
              </div>
              <Button 
                variant="outline" 
                className="mt-10 border-slate-800 text-slate-400"
                onClick={() => setIsListening(false)}
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button 
        variant="outline" 
        size="icon"
        className={cn(
          "w-12 h-12 rounded-full border-slate-800 transition-all",
          isListening ? "bg-red-500/10 border-red-500 text-red-500" : "bg-slate-900 hover:border-blue-500 hover:text-blue-400"
        )}
        onClick={startListening}
      >
        <Mic className="w-5 h-5" />
      </Button>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
