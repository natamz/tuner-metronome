<template>
  <div id="meter-container">
    <div v-for="i in 11" class="meter" :style="`transform: rotate(${(i - 6) * 10}deg)`"></div>
    <div id="meter-pointer" :style="`transform:rotate(${pointerDeg}deg); opacity:${opacity}`"></div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    cent: { type: Number },
  },
  computed: {
    pointerDeg(): number {
      if (-50 <= this.cent && this.cent <= 50) {
        return this.cent;
      }
      return 0;
    },
    opacity(): number {
      return this.cent === undefined ? 0.2 : 1;
    },
  },
};
</script>

<style lang="scss" scoped>
#meter-container {
  margin-top: 20px;
  height: 200px;
  max-height: 50vw;
  width: 100%;

  * {
    height: 200px;
    max-height: 50vw;
    transform-origin: bottom;
    position: absolute;
    right: 50%;
  }

  .meter {
    width: 2px;
    border-top: 2vh solid #7c7c7c;
    &:nth-child(5n + 1) {
      border-top: 3vh solid #525252;
      width: 3px;
    }
  }
  #meter-pointer {
    width: 3px;
    transition: transform 0.5s;
    border-top: 150px solid #2c3e50;
  }
}
</style>
