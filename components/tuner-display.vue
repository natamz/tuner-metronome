<template>
  <div id="display-container">
    <span id="note-name" v-if="note != null">{{ note.name }}</span>
    <span id="note-octave" v-if="note != null">{{ note.octave }}</span>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    note: { type: Object as () => Note },
  },
};
</script>

<style lang="scss" scoped>
#display-container {
  font-family: sans-serif;
  height: 120px;
  margin-top: 10px;
  text-align: center;
  border: 1px solid #a7a7a7a4;
  border-radius: 10px;
  padding: 10px 0;
  font-weight: bold;
  line-height: 100px;
}
#note-name {
  font-size: 90px;
}
#note-octave {
  font-size: 40px;
}
</style>
