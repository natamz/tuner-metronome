<template>
  <metronome-setting ref="settingsDialog" @save="saveSetting"></metronome-setting>

  <v-card style="min-height: 50vh">
    <v-card-text>
      <v-row>
        <v-col>
          <span class="text-h2 font-weight-light" v-text="-bpm"></span>
          <span class="subheading font-weight-light mr-1">BPM</span>
        </v-col>
        <v-col>
          <v-btn theme="dark" icon elevation="0" @click="onPlayBtnClick">
            <v-icon size="large" :icon="isRunning ? 'mdi-pause' : 'mdi-play'"></v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn icon @click="$refs.settingsDialog.showDialog()">
            <v-icon>mdi-cog-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <div id="slider-container">
        <v-slider
          v-model="bpm"
          track-color="grey"
          min="-300"
          max="-40"
          :step="1"
          direction="vertical"
          class="pointer"
          :style="`transform:rotate(${pointerDeg}deg);`"
        ></v-slider>
        <v-btn size="large" icon="mdi-minus" @click="decrementBpm" class="minus-btn"></v-btn>
        <v-btn size="large" icon="mdi-plus" @click="incrementBpm" class="plus-btn"></v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { LSKeys } from "@/consts/localStorageKeys";

const MAX_BPM: number = 300;
const MIN_BPM: number = 40;

export default {
  data() {
    return {
      isRunning: false,
      intervalId: null,
      pointerIntervalId: null,
      bpm: -60,
      beat: 4,
      pointerDeg: 0,
    };
  },
  methods: {
    onPlayBtnClick() {
      clearInterval(this.intervalId);
      clearInterval(this.pointerIntervalId);
      if (this.isRunning) {
        this.isRunning = false;
      } else {
        this.start();
        this.isRunning = true;
      }
    },
    start() {
      clearInterval(this.intervalId);
      let count = 0;
      let sign = 1;
      this.startPointer(sign);
      this.intervalId = setInterval(() => {
        sign *= -1;
        this.startPointer(sign);
        this.$audio.low();
        if (++count == this.beat) {
          this.$audio.high();
          count = 0;
        }
      }, (60 / -this.bpm) * 1000);
    },
    incrementBpm() {
      this.bpm = -Math.min(MAX_BPM, -this.bpm + 1);
    },
    decrementBpm() {
      this.bpm = -Math.max(MIN_BPM, -this.bpm - 1);
    },
    startPointer(sign) {
      clearInterval(this.pointerIntervalId);
      const fps = 50;
      const diff = (-this.bpm / 60 / fps) * Math.PI * sign;
      let x = 0;
      this.pointerIntervalId = setInterval(() => {
        this.pointerDeg = Math.sin(x) * 30;
        x += diff;
      }, 1000 / fps);
    },
    saveSetting() {
      this.beat = localStorage.getItem(LSKeys.beat);
    },
  },
  watch: {
    bpm: {
      handler() {
        if (this.isRunning) {
          this.start();
        }
        localStorage.setItem(LSKeys.bpm, this.bpm);
      },
    },
  },
  mounted() {
    this.bpm = localStorage.getItem(LSKeys.bpm) ?? -60;
    this.beat = localStorage.getItem(LSKeys.beat) ?? 4;
  },
};
</script>

<style lang="scss" scoped>
#slider-container {
  height: 30vh;
  > button {
    position: absolute;
    bottom: 10px;
    &.minus-btn {
      left: 10vw;
    }
    &.plus-btn {
      right: 10vw;
    }
  }
  .pointer {
    transform-origin: bottom;
  }
}
</style>
<style lang="scss">
#slider-container > .v-slider {
  height: 100%;
  .v-input__control {
    height: 25vh;
    min-height: 25vh;
  }
}
</style>
