<template>
  <div id="meter-container">
    <div id="meter-center"></div>
    <div id="meter-left"></div>
    <div id="meter-right"></div>
    <div id="meter-pointer" :style="`transform:rotate(${pointerDeg}deg)`"></div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    cent: { type: Number },
  },
  computed: {
    pointerDeg(): number {
      if (this.cent === undefined) {
      }

      if (-50 <= this.cent && this.cent <= 50) {
        if (this.cent === 0) {
        }
        return (this.cent / 50) * 45;
      }

      return 0;
    },
  },
};
</script>

<style lang="scss" scoped>
#meter-container {
  margin-top: 20px;
  height: 100px;
  width: 100%;
  .meter{
    
  }
  #meter-center {
    width: 2px;
    height: 100px;
    transform-origin: bottom;
    position: absolute;
    right: 50%;
    border-top: 10px solid #6b6b6b;
  }
  #meter-left {
    width: 2px;
    height: 100px;
    transform-origin: bottom;
    position: absolute;
    right: 50%;
    border-top: 10px solid #6b6b6b;
    transform: rotate(-45deg);
  }
  #meter-right {
    width: 2px;
    height: 100px;
    transform-origin: bottom;
    position: absolute;
    right: 50%;
    border-top: 10px solid #6b6b6b;
    transform: rotate(45deg);
  }
  #meter-pointer {
    width: 2px;
    height: 100px;
    background: #2c3e50;
    transform-origin: bottom;
    transition: transform 0.5s;
    position: absolute;
    right: 50%;
  }
}
</style>
