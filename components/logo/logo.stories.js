import React from "react";
import Logo from "./logo";

export default {
  component: Logo,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  title: "Logo",
};

const Template = (args) => <Logo {...args} />;

/**
 * Default
 */

export const Default = Template.bind({});
