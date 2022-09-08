<template>
  <div id="container" class="d-inline-block float-right">
    <v-btn icon flat @click="down">
      <v-icon>mdi-triangle-small-down</v-icon>
    </v-btn>
    <div id="a4">
      <span v-if="a4 == null">---</span>
      {{ a4 }}
    </div>
    hz
    <v-btn icon flat @click="up">
      <v-icon>mdi-triangle-small-up</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
export default {
  data(): { a4: number } {
    return {
      a4: null,
    };
  },
  methods: {
    up() {
      this.$tuner.a4++;
      this.a4 = this.$tuner.a4;
    },
    down() {
      this.$tuner.a4--;
      this.a4 = this.$tuner.a4;
    },
  },
  mounted() {
    this.a4 = this.$tuner.a4;
  },
};
</script>

<style lang="scss" scoped>
#container {
  border: 1px solid #a7a7a7a4;
}
#a4 {
  font-size: large;
  display: inline-block;
}
</style>
