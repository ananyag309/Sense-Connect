"use client";

import { useEffect, useState } from "react";

const SpeechToText = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  let recognition: SpeechRecognition | null = null;

  // Function to start recognition
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        interimTranscript += event.results[i][0].transcript;
      }
      setText(interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event);
    };

    recognition.start();
    setIsListening(true);
  };

  // Function to stop recognition
  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
    setIsListening(false);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg w-full max-w-lg mx-auto mt-10 text-center space-y-4">
      <h2 className="text-2xl font-semibold">🎙️ Speech to Text</h2>
      <p className="p-4 border rounded-xl min-h-[100px] text-gray-700">{text || "Start speaking to see text here..."}</p>
      <div className="flex justify-center gap-4">
        {!isListening ? (
          <button
            onClick={startListening}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            Start Listening
          </button>
        ) : (
          <button
            onClick={stopListening}
            className="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700"
          >
            Stop Listening
          </button>
        )}
      </div>
    </div>
  );
};

export default SpeechToText;
