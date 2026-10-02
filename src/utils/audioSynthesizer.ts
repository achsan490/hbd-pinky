// Simple Web Audio API music box melody synthesizer for fallback
// Plays a warm, sweet, romantic lullaby / music-box style Happy Birthday melody

class RomanticMusicBox {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: NodeJS.Timeout | number | null = null;
  private noteIndex: number = 0;
  private gainNode: GainNode | null = null;
  private volume: number = 0.5;

  // Happy birthday melody notes & durations
  private melody = [
    { note: "C4", dur: 0.4 },
    { note: "C4", dur: 0.4 },
    { note: "D4", dur: 0.8 },
    { note: "C4", dur: 0.8 },
    { note: "F4", dur: 0.8 },
    { note: "E4", dur: 1.4 },
    { note: "rest", dur: 0.3 },

    { note: "C4", dur: 0.4 },
    { note: "C4", dur: 0.4 },
    { note: "D4", dur: 0.8 },
    { note: "C4", dur: 0.8 },
    { note: "G4", dur: 0.8 },
    { note: "F4", dur: 1.4 },
    { note: "rest", dur: 0.3 },

    { note: "C4", dur: 0.4 },
    { note: "C4", dur: 0.4 },
    { note: "C5", dur: 0.8 },
    { note: "A4", dur: 0.8 },
    { note: "F4", dur: 0.8 },
    { note: "E4", dur: 0.8 },
    { note: "D4", dur: 1.2 },
    { note: "rest", dur: 0.3 },

    { note: "Bb4", dur: 0.4 },
    { note: "Bb4", dur: 0.4 },
    { note: "A4", dur: 0.8 },
    { note: "F4", dur: 0.8 },
    { note: "G4", dur: 0.8 },
    { note: "F4", dur: 1.8 },
    { note: "rest", dur: 0.8 },
  ];

  private noteFreqs: Record<string, number> = {
    C4: 261.63,
    D4: 293.66,
    E4: 329.63,
    F4: 349.23,
    G4: 392.0,
    A4: 440.0,
    Bb4: 466.16,
    C5: 523.25,
    D5: 587.33,
  };

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.gainNode.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, duration: number) {
    if (!this.ctx || !this.gainNode) return;
    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    // Warm sine wave + soft overtone for music box / celesta chime effect
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(0.25 * this.volume, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration + 0.6);

    osc.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc.start(now);
    osc.stop(now + duration + 0.7);
  }

  public play() {
    if (this.isPlaying) return;
    this.initContext();
    this.isPlaying = true;
    this.playStep();
  }

  private playStep = () => {
    if (!this.isPlaying) return;
    const current = this.melody[this.noteIndex];
    if (current && current.note !== "rest") {
      const freq = this.noteFreqs[current.note];
      if (freq) {
        this.playTone(freq, current.dur);
      }
    }

    const stepDuration = ((current ? current.dur : 0.5) + 0.1) * 1000;
    this.noteIndex = (this.noteIndex + 1) % this.melody.length;

    this.timer = setTimeout(this.playStep, stepDuration);
  };

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }
}

export const musicBox = new RomanticMusicBox();
