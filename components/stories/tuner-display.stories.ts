import tunerDisplay from "../tuner-display.vue";

export default {
  title: "tuner-display",
  component: tunerDisplay,
  argTypes: {
    note: {
      description: "tuner-display",
      control: {
        type: "object",
      },
      defaultValue: {
        name: "A",
        octave: 4,
        cent: 0,
      },
    },
  },
};
export const Default = (args, { argTypes }) => ({
  components: { tunerDisplay },
  props: Object.keys(argTypes),
  template: `<tuner-display :note="note"></tuner-display>`,
});
