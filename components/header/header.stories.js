import React from "react";
import Header from "./header";

export default {
  component: Header,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  title: "Header",
};

const Template = (args) => <Header {...args} />;

/**
 * Default
 */

export const Default = Template.bind({});
