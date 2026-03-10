/**
 * Voice Recognition Web Application
 * Browser-based speech recognition using the Web Speech API.
 * Author: Gabriel Demetrios Lafis
 */

class VoiceRecognitionApp {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.transcript = '';
        this.results = [];
        this.language = 'en-US';
        this.onResult = null;
        this.onError = null;
        this.onEnd = null;
    }

    /**
     * Check if the Web Speech API is available
     */
    static isSupported() {
        return !!(
            window.SpeechRecognition ||
            window.webkitSpeechRecognition
        );
    }

    /**
     * Initialize the speech recognition engine
     */
    initialize(options = {}) {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            throw new Error('Speech Recognition API is not supported in this browser.');
        }

        this.recognition = new SpeechRecognition();
        this.recognition.continuous = options.continuous || false;
        this.recognition.interimResults = options.interimResults || true;
        this.recognition.lang = options.language || this.language;
        this.recognition.maxAlternatives = options.maxAlternatives || 3;

        this._setupEventHandlers();
        console.log('Voice recognition initialized');
    }

    /**
     * Set up internal event handlers
     */
    _setupEventHandlers() {
        this.recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const result = event.results[i];
                const text = result[0].transcript;
                const confidence = result[0].confidence;

                if (result.isFinal) {
                    finalTranscript += text;
                    this.results.push({
                        text: text.trim(),
                        confidence: Math.round(confidence * 100) / 100,
                        timestamp: new Date().toISOString(),
                        alternatives: Array.from(result).map((alt) => ({
                            text: alt.transcript.trim(),
                            confidence: Math.round(alt.confidence * 100) / 100,
                        })),
                    });
                } else {
                    interimTranscript += text;
                }
            }

            if (finalTranscript) {
                this.transcript += finalTranscript;
            }

            if (this.onResult) {
                this.onResult({
                    final: finalTranscript,
                    interim: interimTranscript,
                    fullTranscript: this.transcript,
                });
            }
        };

        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            if (this.onError) {
                this.onError(event.error);
            }
        };

        this.recognition.onend = () => {
            this.isListening = false;
            if (this.onEnd) {
                this.onEnd({
                    transcript: this.transcript,
                    results: this.results,
                });
            }
        };
    }

    /**
     * Start listening for speech
     */
    start() {
        if (!this.recognition) {
            throw new Error('Call initialize() before starting.');
        }
        if (this.isListening) {
            return;
        }

        this.transcript = '';
        this.results = [];
        this.isListening = true;
        this.recognition.start();
        console.log('Listening...');
    }

    /**
     * Stop listening
     */
    stop() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
            this.isListening = false;
            console.log('Stopped listening');
        }
    }

    /**
     * Change recognition language
     */
    setLanguage(langCode) {
        this.language = langCode;
        if (this.recognition) {
            this.recognition.lang = langCode;
        }
    }

    /**
     * Get all recorded results
     */
    getResults() {
        return {
            transcript: this.transcript,
            results: this.results,
            resultCount: this.results.length,
            isListening: this.isListening,
        };
    }

    /**
     * Get word frequency analysis from transcript
     */
    analyzeTranscript() {
        if (!this.transcript) return { words: [], totalWords: 0 };

        const words = this.transcript
            .toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
            .filter((w) => w.length > 0);

        const freq = {};
        words.forEach((word) => {
            freq[word] = (freq[word] || 0) + 1;
        });

        const sorted = Object.entries(freq)
            .sort((a, b) => b[1] - a[1])
            .map(([word, count]) => ({ word, count }));

        return {
            words: sorted,
            totalWords: words.length,
            uniqueWords: sorted.length,
            averageConfidence:
                this.results.length > 0
                    ? Math.round(
                          (this.results.reduce((sum, r) => sum + r.confidence, 0) /
                              this.results.length) *
                              100
                      ) / 100
                    : 0,
        };
    }

    /**
     * Clear all data
     */
    clear() {
        this.transcript = '';
        this.results = [];
    }
}


/**
 * Supported languages
 */
const SUPPORTED_LANGUAGES = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'pt-BR', name: 'Portuguese (Brazil)' },
    { code: 'es-ES', name: 'Spanish (Spain)' },
    { code: 'fr-FR', name: 'French (France)' },
    { code: 'de-DE', name: 'German (Germany)' },
    { code: 'it-IT', name: 'Italian (Italy)' },
    { code: 'ja-JP', name: 'Japanese (Japan)' },
    { code: 'zh-CN', name: 'Chinese (Simplified)' },
];


// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VoiceRecognitionApp, SUPPORTED_LANGUAGES };
} else {
    window.VoiceRecognitionApp = VoiceRecognitionApp;
    window.SUPPORTED_LANGUAGES = SUPPORTED_LANGUAGES;
}
