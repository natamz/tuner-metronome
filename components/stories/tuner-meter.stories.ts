import tunerMeter from "../tuner-meter.vue";

export default {
  title: "tuner-meter",
  component: tunerMeter,
  argTypes: {
    cent: {
      description: "cent",
      control: {
        type: "number",
      },
    },
  },
};
export const Default = (args, { argTypes }) => ({
  components: { tunerMeter },
  props: Object.keys(argTypes),
  template: `<tuner-meter :cent="cent"></tuner-meter>`,
});
