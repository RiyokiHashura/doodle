export interface VoiceRecorderOptions {
  onDataAvailable?: (blob: Blob) => void;
  onStart?: () => void;
  onStop?: () => void;
  onError?: (error: Error) => void;
}

export class VoiceRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private stream: MediaStream | null = null;
  private audioChunks: Blob[] = [];
  private options: VoiceRecorderOptions;

  constructor(options: VoiceRecorderOptions = {}) {
    this.options = options;
  }

  public async start(): Promise<void> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
        if (this.options.onDataAvailable) {
          this.options.onDataAvailable(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        if (this.options.onStop) {
          this.options.onStop();
        }
        if (this.options.onDataAvailable) {
          this.options.onDataAvailable(audioBlob);
        }
        this.cleanup();
      };

      this.mediaRecorder.start();
      if (this.options.onStart) {
        this.options.onStart();
      }
    } catch (error) {
      if (this.options.onError) {
        this.options.onError(error instanceof Error ? error : new Error(String(error)));
      }
      throw error;
    }
  }

  public stop(): void {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
  }

  public isRecording(): boolean {
    return this.mediaRecorder?.state === 'recording';
  }

  public getAudioBlob(): Blob | null {
    if (this.audioChunks.length === 0) return null;
    return new Blob(this.audioChunks, { type: 'audio/wav' });
  }

  private cleanup(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.mediaRecorder = null;
    this.audioChunks = [];
  }

  public dispose(): void {
    this.stop();
    this.cleanup();
  }
} 