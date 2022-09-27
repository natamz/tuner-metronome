<template>
  <v-card style="min-height: 50vh">
    <v-card-text>
      <v-btn icon @click="onBtnClick">
        <v-icon :icon="isRunning ? 'mdi-microphone' : 'mdi-microphone-off'"></v-icon>
      </v-btn>
      <tuner-control></tuner-control>
      <tuner-display :note="note"></tuner-display>
      <tuner-meter :cent="note?.cent"></tuner-meter>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
export default {
  data(): { note: Note; isRunning: boolean; timer: NodeJS.Timer } {
    return {
      note: null,
      isRunning: false,
      timer: null,
    };
  },
  methods: {
    async onBtnClick() {
      if (this.isRunning) {
        this.isRunning = false;
        this.note = null;
        this.$tuner.stop();
        clearInterval(this.timer);
        return;
      }

      this.isRunning = true;
      await this.$tuner.start();

      this.timer = setInterval(() => {
        const note: Note = this.$tuner.getNote();
        this.note = note;
      }, 10);
    },
  },
};
</script>

<style lang="scss" scoped></style>
