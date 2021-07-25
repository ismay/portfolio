import React from "react";
import Footer from "./footer";

export default {
  component: Footer,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  title: "Footer",
};

const Template = (args) => <Footer {...args} />;

/**
 * Default
 */

export const Default = Template.bind({});
