'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, UserButton } from '@clerk/nextjs';

import MobileNav from './MobileNav';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    const speakBtn = document.getElementById("speakBtn");
    const stopBtn = document.getElementById("stopBtn");

    if (speakBtn && stopBtn) {
      speakBtn.addEventListener("click", () => {
        const textToRead = document.body.innerText;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      });

      stopBtn.addEventListener("click", () => {
        window.speechSynthesis.cancel();
      });
    }
  }, []);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        interimTranscript += event.results[i][0].transcript;
      }
      setTranscript(interimTranscript);
    };

    recognition.start();
    setIsListening(true);

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event);
      setIsListening(false);
    };
  };

  const stopListening = () => {
    window.speechSynthesis.cancel(); // just to be safe — stop any ongoing speech
    const recognition = (window as any).speechRecognitionInstance;
    if (recognition) {
      recognition.stop();
    }
    setIsListening(false);
  };

  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="yoom logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          YOOM
        </p>
      </Link>

      <div className="flex-between gap-5">
        <button id="speakBtn" title="Speak Page" className="text-white text-xl">🔊</button>
        <button id="stopBtn" title="Stop Speaking" className="text-white text-xl">🛑</button>

        {/* Speech-to-Text Mic Button */}
        {!isListening ? (
          <button
            onClick={startListening}
            title="Start Listening"
            className="text-white text-xl"
          >
            🎙️
          </button>
        ) : (
          <button
            onClick={stopListening}
            title="Stop Listening"
            className="text-white text-xl"
          >
            ⏹️
          </button>
        )}

        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>

        <MobileNav />
      </div>

      {/* Transcript Display */}
      {transcript && (
        <div className="fixed bottom-4 right-4 bg-white text-black p-3 rounded-xl shadow-lg max-w-xs z-50">
          <p className="text-sm">{transcript}</p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
