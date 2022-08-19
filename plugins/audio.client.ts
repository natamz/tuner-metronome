export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("audio", new AudioUtil());
});

class AudioUtil {
  low() {
    play(buffs[fileNames.beep_1]);
  }
  high() {
    play(buffs[fileNames.beep_2]);
  }
}

const fileNames = { beep_1: "beep_1.wav", beep_2: "beep_2.wav" };
const buffs: AudioBuffer[] = [];

const audioContext = new AudioContext();
const gain = audioContext.createGain();
gain.connect(audioContext.destination);

(async () => {
  Object.values(fileNames).forEach(async (item) => {
    const response = await fetch(`./audio/${item}`);
    const buffer = await response.arrayBuffer();
    buffs[item] = await audioContext.decodeAudioData(buffer);
  });
})();

function createSourceNode(audioBuffer: AudioBuffer): AudioBufferSourceNode {
  const sourceNode = audioContext.createBufferSource();
  sourceNode.buffer = audioBuffer;
  return sourceNode;
}

function play(audioBuffer: AudioBuffer) {
  const source = createSourceNode(audioBuffer);
  gain.gain.value = 0.5;
  source.connect(gain);
  source.start(0);
}
