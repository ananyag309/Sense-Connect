
// Type definitions for Web Speech API

interface Window {
  SpeechRecognition: typeof SpeechRecognition;
  webkitSpeechRecognition: typeof SpeechRecognition;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
  error: SpeechRecognitionError;
}

interface SpeechRecognitionError extends Event {
  error: string;
  message: string;
}

declare class SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionError) => void) | null;
  onend: ((event: Event) => void) | null;
  onstart: ((event: Event) => void) | null;
  onspeechend: ((event: Event) => void) | null;
  onnomatch: ((event: Event) => void) | null;
  onaudiostart: ((event: Event) => void) | null;
  onaudioend: ((event: Event) => void) | null;
  onsoundstart: ((event: Event) => void) | null;
  onsoundend: ((event: Event) => void) | null;
  onspeechstart: ((event: Event) => void) | null;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

// Declare vapiSDK for Vapi AI assistant
interface VapiSDK {
  run: (config: VapiConfig) => VapiInstance;
}

interface VapiConfig {
  apiKey: string;
  assistant: string;
  config?: any;
}

interface VapiInstance {
  open: () => void;
  close: () => void;
}

interface Window {
  vapiSDK: VapiSDK;
  vapiInstance: VapiInstance | null;
}
