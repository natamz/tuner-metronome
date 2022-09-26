<template>
  <div>
    <v-dialog max-width="800px" fullscreen v-model="dialog" transition="dialog-bottom-transition" class="settintgs-dialog">
      <v-card>
        <v-toolbar>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>設定</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="3">
              <v-btn @click="setBeat(1)" :color="1 == beat ? 'primary' : ''">1/4</v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn @click="setBeat(2)" :color="2 == beat ? 'primary' : ''">2/4</v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn @click="setBeat(3)" :color="3 == beat ? 'primary' : ''">3/4</v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn @click="setBeat(4)" :color="4 == beat ? 'primary' : ''">4/4</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text>
          <v-btn block @click="save">保存</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { LSKeys } from "@/consts/localStorageKeys";

export default {
  data(): {
    dialog: boolean;
    beat: number;
  } {
    return {
      dialog: false,
      beat: 4,
    };
  },
  methods: {
    showDialog() {
      this.beat = localStorage.getItem(LSKeys.beat) ?? 4;
      this.dialog = true;
    },
    setBeat(beat: number) {
      this.beat = beat;
    },
    save() {
      localStorage.setItem(LSKeys.beat, this.beat);
      this.$emit("save");
      this.dialog = false;
    },
  },
};
</script>
