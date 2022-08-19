<template>
  <v-card>
    <v-card-text>
      <v-row class="mb-4" justify="space-between">
        <v-col>
          <span class="text-h2 font-weight-light" v-text="bpm"></span>
          <span class="subheading font-weight-light mr-1">BPM</span>
          <v-fade-transition>
            <v-avatar
              v-if="isRunning"
              class="mb-1 v-avatar--metronome"
              size="12"
            ></v-avatar>
          </v-fade-transition>
        </v-col>
        <v-col>
          <v-btn theme="dark" icon elevation="0" @click="onPlayBtnClick">
            <v-icon
              size="large"
              :icon="isRunning ? 'mdi-pause' : 'mdi-play'"
            ></v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
    <v-slider v-model="bpm" track-color="grey" min="40" max="300" :step="1">
      <template v-slot:prepend>
        <v-btn
          size="small"
          variant="text"
          icon="mdi-minus"
          @click="decrementBpm"
        ></v-btn>
      </template>

      <template v-slot:append>
        <v-btn
          size="small"
          variant="text"
          icon="mdi-plus"
          @click="incrementBpm"
        ></v-btn>
      </template>
    </v-slider>
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
      bpm: 60,
      beat: 4,
    };
  },
  methods: {
    onPlayBtnClick() {
      clearInterval(this.intervalId);
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
      this.intervalId = setInterval(() => {
        this.$audio.low();
        if (++count == this.beat) {
          this.$audio.high();
          count = 0;
        }
      }, (60 / this.bpm) * 1000);
    },
    incrementBpm() {
      this.bpm = Math.min(MAX_BPM, this.bpm + 1);
    },
    decrementBpm() {
      this.bpm = Math.max(MIN_BPM, this.bpm - 1);
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
    this.bpm = localStorage.getItem(LSKeys.bpm) ?? 60;
  },
};
</script>
