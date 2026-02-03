'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Search, X, Volume2 } from 'lucide-react';

interface VoiceSearchProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export default function VoiceSearch({ 
  onSearch, 
  placeholder = "ابحث بالصوت...", 
  className = "" 
}: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Check if browser supports Web Speech API
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      setIsSupported(true);
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'ar-SA';
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        
        if (event.results[0].isFinal) {
          setIsListening(false);
          setIsProcessing(false);
          onSearch?.(transcript);
          setTranscript('');
        }
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setIsProcessing(false);
        setTranscript('');
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
        setIsProcessing(false);
      };
    }
  }, [onSearch]);

  const startListening = () => {
    if (!isSupported || !recognitionRef.current) return;
    
    setIsListening(true);
    setIsProcessing(true);
    setTranscript('');
    
    try {
      recognitionRef.current.start();
      
      // Auto-stop after 10 seconds
      timeoutRef.current = setTimeout(() => {
        if (isListening) {
          stopListening();
        }
      }, 10000);
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setIsListening(false);
      setIsProcessing(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsListening(false);
    setIsProcessing(false);
  };

  const handleSearch = () => {
    if (transcript.trim()) {
      onSearch?.(transcript.trim());
      setTranscript('');
    }
  };

  if (!isSupported) {
    return (
      <div className={`relative ${className}`}>
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-500 text-sm">
          <Mic className="w-4 h-4" />
          <span>البحث الصوتي غير مدعوم في هذا المتصفح</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center gap-2">
        {isListening ? (
          <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-600 text-sm font-medium">جاري الاستماع...</span>
            </div>
            <button
              onClick={stopListening}
              className="p-1 text-red-600 hover:text-red-700 transition-colors"
            >
              <MicOff className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={startListening}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
          >
            <Mic className="w-4 h-4 text-blue-600" />
            <span className="text-blue-600 text-sm font-medium">{placeholder}</span>
          </button>
        )}
        
        {transcript && (
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
            <span className="text-gray-700 text-sm">{transcript}</span>
            <div className="flex items-center gap-1">
              <button
                onClick={handleSearch}
                className="p-1 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTranscript('')}
                className="p-1 text-gray-600 hover:text-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
      
      {isProcessing && (
        <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent animate-spin rounded-full" />
            <span>جاري المعالجة...</span>
          </div>
        </div>
      )}
    </div>
  );
}
