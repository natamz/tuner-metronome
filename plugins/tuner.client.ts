export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("tuner", new Tuner());
});

const NoteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

window.AudioContext = window.AudioContext || window.webkitAudioContext;
if (!window.AudioContext) {
  alert("お使いのブラウザはサポートされていません。");
}

if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function (constraints) {
    const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (!getUserMedia) {
      alert("お使いのブラウザはサポートされていません。");
    }
    return new Promise(function (resolve, reject) {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  };
}

let audioContext: AudioContext;
let analyser: AnalyserNode;
let stream: MediaStream;
let bufferLength: number;
let dataArray: Uint8Array;

class Tuner {
  async start() {
    if (!audioContext) {
      init();
    }
    audioContext.resume();
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContext.createMediaStreamSource(stream).connect(analyser);
  }
  stop() {
    audioContext.suspend();
    stream.getTracks().forEach((track) => {
      track.stop();
    });
    analyser.disconnect();
  }
  getNote(): Note {
    analyser.getByteFrequencyData(dataArray);
    const maxindex = dataArray.reduce((iMax, x, i, arr) => (x > arr[iMax] ? i : iMax), 0);
    const freq = Math.round((maxindex * audioContext.sampleRate) / analyser.fftSize);
    if (freq != 0) {
      return freqToNote(freq, 440);
    }
  }
}

// 初期化
async function init() {
  audioContext = new AudioContext();
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 32768;
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
}

// 周波数をNoteに変換
function freqToNote(freq: number, a4: number): Note {
  const midi = freqToMidi(freq, a4);
  const noteNum = Math.round(midi / 100); // 音番号
  const cent = Math.round((midi / 100 - noteNum) * 100); // セント
  const octave = Math.floor(noteNum / 12) - 1; // オクターブ
  const noteName = NoteStrings[noteNum % 12];

  return { octave: octave, cent: cent, name: noteName };
}

// 周波数をMIDIノート番号に変換
function freqToMidi(freq: number, a4: number): number {
  return Math.log2(freq / a4) * 1200 + 6900;
}
